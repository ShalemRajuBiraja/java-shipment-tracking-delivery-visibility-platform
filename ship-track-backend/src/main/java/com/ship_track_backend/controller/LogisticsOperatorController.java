package com.ship_track_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.dto.OperatorDashboardResponse;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.UpdateShipmentStatusData;
import com.ship_track_backend.service.LogisticsOperatorService;

import jakarta.validation.Valid;

import java.util.List;

import com.ship_track_backend.dto.ShipmentResponseDto;

@RestController
public class LogisticsOperatorController {

    @Autowired
    private LogisticsOperatorService logisticsOperatorService;


    // ================= OPERATOR DASHBOARD =================

    @GetMapping("/api/operator/dashboard")
    public ResponseEntity<ApiResponse<OperatorDashboardResponse>>
    getDashboardStatistics() {

        OperatorDashboardResponse dashboardData =
                logisticsOperatorService.getDashboardStatistics();

        ApiResponse<OperatorDashboardResponse> response =
                new ApiResponse<>(
                        true,
                        "Dashboard statistics fetched successfully",
                        dashboardData
                );

        return ResponseEntity.ok(response);
    }
    
 // ================= OPERATOR SHIPMENTS =================

    @GetMapping("/api/operator/shipments")
    public ResponseEntity<ApiResponse<List<ShipmentResponseDto>>>
    getAllShipments() {

        List<ShipmentResponseDto> shipments =
                logisticsOperatorService.getAllShipments();

        ApiResponse<List<ShipmentResponseDto>> response =
                new ApiResponse<>(
                        true,
                        "Shipments fetched successfully",
                        shipments
                );

        return ResponseEntity.ok(response);
    }
    
 // ================= GET SHIPMENT DETAILS =================

    @GetMapping("/api/operator/shipments/{id}")
    public ResponseEntity<ApiResponse<ShipmentResponseDto>>
    getShipmentById(@PathVariable Long id) {

        ShipmentResponseDto shipment =
                logisticsOperatorService.getShipmentById(id);

        ApiResponse<ShipmentResponseDto> response =
                new ApiResponse<>(
                        true,
                        "Shipment details fetched successfully",
                        shipment
                );

        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/api/operator/shipments/{id}/status")
    public ResponseEntity<ApiResponse<ShipmentResponseDto>>
    updateShipmentStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateShipmentStatusData updateData) {

        ShipmentResponseDto shipment =
                logisticsOperatorService.updateShipmentStatus(
                        id,
                        updateData
                );

        ApiResponse<ShipmentResponseDto> response =
                new ApiResponse<>(
                        true,
                        "Shipment status updated successfully",
                        shipment
                );

        return ResponseEntity.ok(response);
    }
}