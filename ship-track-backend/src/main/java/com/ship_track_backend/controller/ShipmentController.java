package com.ship_track_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.CreateShipmentData;
import com.ship_track_backend.service.ShipmentService;
import java.util.List;


import org.springframework.web.bind.annotation.GetMapping;

import com.ship_track_backend.dto.ShipmentResponseDto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import com.ship_track_backend.pojo.UpdateShipmentData;
import com.ship_track_backend.pojo.UpdateShipmentStatusData;


@RestController
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @PostMapping("/api/create-shipment")
    public ResponseEntity<ApiResponse<Void>> createShipment(
            @Valid @RequestBody CreateShipmentData createShipmentData) {

        shipmentService.createShipment(createShipmentData);

        ApiResponse<Void> response = new ApiResponse<>( true, "Shipment created successfully", null );

        return ResponseEntity .status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping("/api/get-shipments")
    public ResponseEntity<ApiResponse<List<ShipmentResponseDto>>> getAllShipments(Authentication authentication) {

    	String email = authentication.getName();
        List<ShipmentResponseDto> shipments = shipmentService.getAllShipments(email);

        ApiResponse<List<ShipmentResponseDto>> response = new ApiResponse<>(true,"Shipments fetched successfully", shipments);

        return ResponseEntity.status(HttpStatus.OK) .body(response);
    }
    
    
    @GetMapping("/shipments/{id}")
    public ResponseEntity<ApiResponse<ShipmentResponseDto>> getShipmentById( @PathVariable Long id) {

        ShipmentResponseDto shipment = shipmentService.getShipmentById(id);

        ApiResponse<ShipmentResponseDto> response =
                new ApiResponse<>( true, "Shipment fetched successfully", shipment );

        return ResponseEntity .status(HttpStatus.OK).body(response);
    }
    
    @PutMapping("/shipments/{id}")
    public ResponseEntity<ApiResponse<Void>> updateShipment( @PathVariable Long id, @Valid @RequestBody UpdateShipmentData updateShipmentData) {

        shipmentService.updateShipment(id, updateShipmentData);

        ApiResponse<Void> response =new ApiResponse<>( true, "Shipment updated successfully", null);

        return ResponseEntity .status(HttpStatus.OK).body(response);
    }
    
    
    @PutMapping("/shipments/{id}/assign-operator")
    public ResponseEntity<ApiResponse<Void>> assignOperator( @PathVariable Long id) {

        shipmentService.assignOperator(id);

        ApiResponse<Void> response =new ApiResponse<>( true, "Logistics operator assigned successfully",null );

        return ResponseEntity .status(HttpStatus.OK).body(response);
    }
    @PutMapping("/shipments/{id}/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelShipment(@PathVariable Long id) {

        shipmentService.cancelShipment(id);

        ApiResponse<Void> response = new ApiResponse<>( true, "Shipment cancelled successfully", null);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PutMapping("/shipments/{shipmentId}/status")
    public ResponseEntity<ApiResponse<Void>> updateShipmentStatus(
            @PathVariable Long shipmentId,
            @Valid @RequestBody UpdateShipmentStatusData updateShipmentStatusData,
            Authentication  authentication) {

        shipmentService.updateShipmentStatus(
                shipmentId,
                updateShipmentStatusData,
                authentication.getName()
        );

        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Shipment status updated successfully",
                null
        );

        return ResponseEntity.ok(response);
    }
}