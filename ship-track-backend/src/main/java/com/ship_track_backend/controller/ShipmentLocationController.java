package com.ship_track_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ship_track_backend.dto.ShipmentLocationResponseDto;
import com.ship_track_backend.pojo.ShipmentLocationRequest;
import com.ship_track_backend.service.ShipmentLocationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin
public class ShipmentLocationController {

    @Autowired
    private ShipmentLocationService shipmentLocationService;


    // ================= SAVE SHIPMENT LOCATION =================

    @PostMapping("/{trackingNumber}/location")
    public ResponseEntity<ShipmentLocationResponseDto> saveLocation(
            @PathVariable String trackingNumber,
            @Valid @RequestBody ShipmentLocationRequest request) {

        ShipmentLocationResponseDto response =
                shipmentLocationService.saveLocation(
                        trackingNumber,
                        request.getLatitude(),
                        request.getLongitude()
                );

        return ResponseEntity.status(HttpStatus.CREATED) .body(response);
    }

    // ================= GET LATEST LOCATION =================

    @GetMapping("/{trackingNumber}/location/latest")
    public ShipmentLocationResponseDto getLatestLocation(
            @PathVariable String trackingNumber) {

        return shipmentLocationService.getLatestLocation(
                trackingNumber
        );
    }


    // ================= GET LOCATION HISTORY =================

    @GetMapping("/{trackingNumber}/locations")
    public List<ShipmentLocationResponseDto> getLocationHistory(
            @PathVariable String trackingNumber) {

        return shipmentLocationService.getLocationHistory(
                trackingNumber
        );
    }
    
    @GetMapping("/{trackingNumber}/route-history")
    public ResponseEntity<Map<String, Object>> getRoadFollowingRouteHistory(
            @PathVariable String trackingNumber) {

        Map<String, Object> response =
                shipmentLocationService
                        .getRoadFollowingRouteHistory(
                                trackingNumber
                        );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}