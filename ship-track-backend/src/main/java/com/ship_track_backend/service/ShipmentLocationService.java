package com.ship_track_backend.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ship_track_backend.dto.ShipmentLocationResponseDto;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.ShipmentLocationEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.repository.ShipmentLocationRepository;
import com.ship_track_backend.repository.ShipmentRepository;

@Service
public class ShipmentLocationService {

    @Autowired
    private ShipmentLocationRepository shipmentLocationRepository;

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private GoogleRoutesService googleRoutesService;


 // ================= SAVE SHIPMENT LOCATION =================

    public ShipmentLocationResponseDto saveLocation(
            String trackingNumber,
            Double latitude,
            Double longitude) {

        // ================= GET LOGGED-IN USER =================
    	String email = SecurityContextHolder.getContext().getAuthentication().getName();


        // ================= FIND SHIPMENT =================
    	ShipmentEntity shipment = shipmentRepository .findByTrackingNumber(trackingNumber) .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Shipment not found"
                                )
                        );


        // ================= CHECK ASSIGNED OPERATOR =================

        UserEntity assignedOperator =
                shipment.getAssignedOperator();

        if (assignedOperator == null) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Shipment is not assigned to any logistics operator"
            );
        }
        // ================= VERIFY OPERATOR =================

        if (!assignedOperator.getEmail().equalsIgnoreCase(email)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to update this shipment location"
            );
        }


        // ================= CREATE LOCATION =================

        ShipmentLocationEntity location =
                new ShipmentLocationEntity();

        location.setShipment(shipment);

        location.setLatitude(latitude);

        location.setLongitude(longitude);

        location.setRecordedAt(LocalDateTime.now());


        // ================= SAVE LOCATION =================

        ShipmentLocationEntity savedLocation =
                shipmentLocationRepository.save(location);


        // ================= RETURN CLEAN DTO =================

        return convertToDto(savedLocation);
    }


    // ================= GET LATEST LOCATION =================
    public ShipmentLocationResponseDto getLatestLocation( String trackingNumber) {

        // ================= GET LOGGED-IN USER =================
        String email =  SecurityContextHolder.getContext().getAuthentication().getName();


        // ================= FIND SHIPMENT =================
        ShipmentEntity shipment = shipmentRepository
                        .findByTrackingNumber(trackingNumber)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Shipment not found"
                                )
                        );


        ShipmentLocationEntity location =
                shipmentLocationRepository
                        .findTopByShipmentTrackingNumberOrderByRecordedAtDesc(
                                trackingNumber
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "No location found for this shipment"
                                )
                        );


        return convertToDto(location);
    }


    // ================= GET LOCATION HISTORY =================

    public List<ShipmentLocationResponseDto> getLocationHistory(
            String trackingNumber) {

        // CHECK SHIPMENT EXISTS

        shipmentRepository
                .findByTrackingNumber(trackingNumber)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Shipment not found"
                        )
                );


        List<ShipmentLocationEntity> locations =
                shipmentLocationRepository
                        .findByShipmentTrackingNumberOrderByRecordedAtAsc(
                                trackingNumber
                        );


        return locations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    // ================= GET ROAD-FOLLOWING ROUTE HISTORY =================
    public Map<String, Object> getRoadFollowingRouteHistory(
            String trackingNumber) {

        shipmentRepository
                .findByTrackingNumber(trackingNumber)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Shipment not found"
                        )
                );

        List<ShipmentLocationEntity> locations =
                shipmentLocationRepository
                        .findByShipmentTrackingNumberOrderByRecordedAtAsc(
                                trackingNumber
                        );

        if (locations.size() < 2) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "At least two location points are required for route history"
            );
        }

        List<Map<String, Double>> routeLocations =
                locations.stream()
                        .map(location -> {

                            Map<String, Double> point =
                                    new HashMap<>();

                            point.put(
                                    "latitude",
                                    location.getLatitude()
                            );

                            point.put(
                                    "longitude",
                                    location.getLongitude()
                            );

                            return point;
                        })
                        .toList();

        return googleRoutesService
                .calculateRouteThroughLocations(
                        routeLocations
                );
    }

    // ================= ENTITY → DTO =================

    private ShipmentLocationResponseDto convertToDto(
            ShipmentLocationEntity location) {

        ShipmentLocationResponseDto dto =
                new ShipmentLocationResponseDto();

        dto.setId(location.getId());

        dto.setTrackingNumber(
                location.getShipment().getTrackingNumber()
        );

        dto.setLatitude(
                location.getLatitude()
        );

        dto.setLongitude(
                location.getLongitude()
        );

        dto.setRecordedAt(
                location.getRecordedAt()
        );

        return dto;
    }
    
}