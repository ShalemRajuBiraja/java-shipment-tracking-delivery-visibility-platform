package com.ship_track_backend.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ship_track_backend.dto.DelayPredictionResponseDto;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.ShipmentTrackingEntity;
import com.ship_track_backend.enums.ShipmentStatus;
import com.ship_track_backend.repository.ShipmentLocationRepository;
import com.ship_track_backend.repository.ShipmentRepository;
import com.ship_track_backend.repository.ShipmentTrackingRepository;

@Service
public class DelayPredictionService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private ShipmentTrackingRepository shipmentTrackingRepository;

    @Autowired
    private ShipmentLocationRepository shipmentLocationRepository;

    @Autowired
    private GoogleRoutesService googleRoutesService;


    // ================= PREDICT SHIPMENT DELAY =================

    public DelayPredictionResponseDto predictDelay(
            String trackingNumber) {

        // ================= FIND SHIPMENT =================

        ShipmentEntity shipment =
                shipmentRepository
                        .findByTrackingNumber(trackingNumber)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Shipment not found"
                                )
                        );


        // ================= FIND PICKED UP TIME =================

        ShipmentTrackingEntity pickedUpTracking =
                shipmentTrackingRepository
                        .findTopByShipmentTrackingNumberAndStatusOrderByCreatedAtAsc(
                                trackingNumber,
                                ShipmentStatus.PICKED_UP
                        )
                        .orElse(null);


        DelayPredictionResponseDto response =
                new DelayPredictionResponseDto();

        response.setTrackingNumber(
                trackingNumber
        );


        // ================= NOT YET PICKED UP =================

        if (pickedUpTracking == null) {

            response.setPrediction(
                    "NOT_STARTED"
            );

            response.setMessage(
                    "Shipment has not been picked up yet."
            );

            return response;
        }


        // ================= GET CURRENT LOCATION =================

        var currentLocation =
                shipmentLocationRepository
                        .findTopByShipmentTrackingNumberOrderByRecordedAtDesc(
                                trackingNumber
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Current shipment location not found"
                                )
                        );


        // ================= DELIVERY ADDRESS =================

        String origin =
                shipment.getPickupLatitude()
                + ","
                + shipment.getPickupLongitude();

        String destination =
                shipment.getDeliveryLatitude()
                + ","
                + shipment.getDeliveryLongitude();

        Map<String, Object> originalRoute =
                googleRoutesService.calculateRoute(
                        origin,
                        destination
                );


        if (
                originalRoute == null
                || originalRoute.get("routes") == null
        ) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unable to calculate original shipment route"
            );
        }


        @SuppressWarnings("unchecked")
		var originalRoutes =
                (List<Map<String, Object>>)
                        originalRoute.get("routes");

        if (originalRoutes.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "No route found for shipment"
            );
        }


        Map<String, Object> originalRouteData =
                originalRoutes.get(0);


        String originalDuration =
                (String) originalRouteData.get(
                        "duration"
                );


        long originalDurationSeconds =
                Long.parseLong(
                        originalDuration.replace("s", "")
                );


        // ================= EXPECTED ARRIVAL =================

        LocalDateTime expectedArrival =
                pickedUpTracking.getCreatedAt()
                        .plusSeconds(
                                originalDurationSeconds
                        );


        // ================= CURRENT ETA =================

        Map<String, Object> currentRoute =
                googleRoutesService.calculateEta(
                        currentLocation.getLatitude(),
                        currentLocation.getLongitude(),
                        destination
                );


        if (
                currentRoute == null
                || currentRoute.get("routes") == null
        ) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unable to calculate current shipment ETA"
            );
        }


        var currentRoutes =
                (java.util.List<Map<String, Object>>)
                        currentRoute.get("routes");


        if (currentRoutes.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "No current ETA route found"
            );
        }


        Map<String, Object> currentRouteData =
                currentRoutes.get(0);


        String currentDuration =
                (String) currentRouteData.get(
                        "duration"
                );


        long currentDurationSeconds =
                Long.parseLong(
                        currentDuration.replace("s", "")
                );


        LocalDateTime currentEstimatedArrival =
                LocalDateTime.now()
                        .plusSeconds(
                                currentDurationSeconds
                        );


        // ================= DELAY CALCULATION =================

        long delayMinutes =
                Duration.between(
                        expectedArrival,
                        currentEstimatedArrival
                ).toMinutes();


        response.setExpectedArrivalTime(
                expectedArrival
                        .atZone(
                                java.time.ZoneId.systemDefault()
                        )
                        .toInstant()
                        .toEpochMilli()
        );


        response.setCurrentEstimatedArrivalTime(
                currentEstimatedArrival
                        .atZone(
                                java.time.ZoneId.systemDefault()
                        )
                        .toInstant()
                        .toEpochMilli()
        );


        // ================= DELAYED =================

        if (delayMinutes > 0) {

            response.setPrediction(
                    "DELAYED"
            );

            response.setDelayMinutes(
                    delayMinutes
            );

            response.setMessage(
                    "Shipment is currently estimated to arrive "
                    + delayMinutes
                    + " minutes late."
            );

        } else {

            response.setPrediction(
                    "ON_TIME"
            );

            response.setDelayMinutes(
                    0L
            );

            response.setMessage(
                    "Shipment is currently expected to arrive on time."
            );
        }


        return response;
    }
}