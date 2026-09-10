package com.ship_track_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ship_track_backend.dto.DeliveryForecastResponseDto;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.ShipmentLocationEntity;
import com.ship_track_backend.repository.ShipmentLocationRepository;
import com.ship_track_backend.repository.ShipmentRepository;

@Service
public class DeliveryForecastingService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private ShipmentLocationRepository shipmentLocationRepository;

    @Autowired
    private GoogleRoutesService googleRoutesService;

    // ================= DELIVERY FORECAST =================

    public DeliveryForecastResponseDto forecastDelivery(
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

        DeliveryForecastResponseDto response =
                new DeliveryForecastResponseDto();

        response.setTrackingNumber(trackingNumber);

        response.setCurrentStatus(
                shipment.getStatus().name()
        );

        // ================= CHECK SHIPMENT STATUS =================

        if (shipment.getStatus() == null) {

            response.setForecast("NOT_STARTED");

            response.setMessage(
                    "Shipment status is not available."
            );

            return response;
        }

        // ================= GET CURRENT LOCATION =================

        ShipmentLocationEntity currentLocation =
                shipmentLocationRepository
                        .findTopByShipmentTrackingNumberOrderByRecordedAtDesc(
                                trackingNumber
                        )
                        .orElse(null);

        if (currentLocation == null) {

            response.setForecast("NOT_STARTED");

            response.setMessage(
                    "Current shipment location is not available yet."
            );

            return response;
        }

        // ================= DELIVERY ADDRESS =================

        String destination =
                shipment.getDeliveryAddress()
                + ", "
                + shipment.getDeliveryCity()
                + ", "
                + shipment.getDeliveryState()
                + ", "
                + shipment.getDeliveryPincode();

        // ================= CURRENT ROUTE =================

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
                    "Unable to calculate delivery forecast"
            );
        }

        List<Map<String, Object>> routes =
                (List<Map<String, Object>>)
                        currentRoute.get("routes");

        if (routes.isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "No route found for delivery forecast"
            );
        }

        Map<String, Object> routeData =
                routes.get(0);

        // ================= TRAVEL TIME =================

        String duration =
                (String) routeData.get("duration");

        long durationSeconds =
                Long.parseLong(
                        duration.replace("s", "")
                );

        long travelTimeMinutes =
                durationSeconds / 60;

        // ================= DISTANCE =================

        Number distance =
                (Number) routeData.get(
                        "distanceMeters"
                );

        long distanceMeters =
                distance != null
                        ? distance.longValue()
                        : 0L;

        // ================= FORECASTED DELIVERY TIME =================

        LocalDateTime forecastedDelivery =
                LocalDateTime.now()
                        .plusSeconds(durationSeconds);

        // ================= SET RESPONSE =================

        response.setForecastedDeliveryTime(
                forecastedDelivery
                        .atZone(
                                java.time.ZoneId.systemDefault()
                        )
                        .toInstant()
                        .toEpochMilli()
        );

        response.setEstimatedTravelTimeMinutes(
                travelTimeMinutes
        );

        response.setEstimatedDistanceMeters(
                distanceMeters
        );

        // ================= FORECAST RESULT =================

        if (
                shipment.getStatus().name().equals("DELIVERED")
        ) {

            response.setForecast("DELIVERED");

            response.setMessage(
                    "Shipment has already been delivered."
            );

        } else {

            response.setForecast("EXPECTED");

            response.setMessage(
                    "Shipment is currently expected to be delivered based on its current location and route."
            );
        }

        return response;
    }
}