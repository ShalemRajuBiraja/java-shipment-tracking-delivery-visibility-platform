package com.ship_track_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.dto.ShipmentLookupResponse;
import com.ship_track_backend.dto.ShipmentResponseDto;
import com.ship_track_backend.dto.TrackingResponseDto;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.CreateShipmentData;
import com.ship_track_backend.service.ShipmentService;

import jakarta.validation.Valid;

@RestController
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;


    // Create Shipment
    @PostMapping("/api/create-shipment")
    public ResponseEntity<ApiResponse<Void>> createShipment(

            @Valid @RequestBody CreateShipmentData createShipmentData) {

        shipmentService.createShipment(createShipmentData);

        ApiResponse<Void> response =
                new ApiResponse<>(
                        true,
                        "Shipment created successfully",
                        null
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // Get All Shipments of Logged-in User
    @GetMapping("/api/get-shipments")
    public ResponseEntity<ApiResponse<List<ShipmentResponseDto>>> getAllShipments(
            Authentication authentication) {

        String email = authentication.getName();

        List<ShipmentResponseDto> shipments = shipmentService.getAllShipments(email);

        ApiResponse<List<ShipmentResponseDto>> response =   new ApiResponse<>( true, "Shipments fetched successfully", shipments );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }


    // Get Single Shipment Details
    @GetMapping("/api/shipments/{id}")
    public ResponseEntity<ApiResponse<ShipmentResponseDto>> getShipmentById(

            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        ShipmentResponseDto shipment =
                shipmentService.getShipmentById(id);

        ApiResponse<ShipmentResponseDto> response =
                new ApiResponse<>(
                        true,
                        "Shipment details fetched successfully",
                        shipment
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }


    // Track Shipment by Tracking Number
    @GetMapping("/api/track/{trackingNumber}")
    public ResponseEntity<ApiResponse<TrackingResponseDto>> getTrackingDetails(

            @PathVariable String trackingNumber) {

        TrackingResponseDto responseData =
                shipmentService.getTrackingDetails(trackingNumber);

        ApiResponse<TrackingResponseDto> response =
                new ApiResponse<>(
                        true,
                        "Tracking details fetched successfully",
                        responseData
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
    
    
    @GetMapping("/api/shipment-history")
    public ResponseEntity<ApiResponse<List<ShipmentResponseDto>>> getShipmentHistory(
            Authentication authentication) {

        String email = authentication.getName();

        List<ShipmentResponseDto> shipments =
                shipmentService.getShipmentHistory(email);

        ApiResponse<List<ShipmentResponseDto>> response =
                new ApiResponse<>(
                        true,
                        "Shipment history fetched successfully",
                        shipments
                );

        return ResponseEntity.ok(response);
    }
    
 // ================= SUPPORT AGENT SHIPMENT LOOKUP =================

    @GetMapping("/api/support-agent/shipment-lookup/{trackingNumber}")
    public ResponseEntity<ApiResponse<ShipmentLookupResponse>>
    getShipmentForSupportAgent(
            @PathVariable String trackingNumber) {

        ShipmentLookupResponse shipment =
                shipmentService
                        .getShipmentForSupportAgent(
                                trackingNumber
                        );

        ApiResponse<ShipmentLookupResponse> response =
                new ApiResponse<>(
                        true,
                        "Shipment details fetched successfully",
                        shipment
                );

        return ResponseEntity.ok(response);
    }
    

}