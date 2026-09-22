package com.ship_track_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ship_track_backend.dto.ShipmentLatitudeResponse;
import com.ship_track_backend.dto.ShipmentLocationResponseDto;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.ShipmentLocationRequest;
import com.ship_track_backend.service.ShipmentLocationService;
import com.ship_track_backend.service.ShipmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin
public class ShipmentLocationController {

    @Autowired
    private ShipmentLocationService shipmentLocationService;
    @Autowired
    private ShipmentService shipmentService;


    // ================= SAVE SHIPMENT LOCATION / UPDATING LIVE LOCATION BY OPERATOR  =================
    @PostMapping("/{trackingNumber}/location")
    public ResponseEntity<ApiResponse<ShipmentLocationResponseDto>> saveLocation( @PathVariable String trackingNumber,
    																@Valid @RequestBody ShipmentLocationRequest request) {

        ShipmentLocationResponseDto response = shipmentLocationService.saveLocation(trackingNumber,  request.getNewLocation());

        ApiResponse<ShipmentLocationResponseDto> apiResponse = new ApiResponse<>(true, "Shipment location saved successfully", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    
    // ================= GET LOCATION =================
    @GetMapping("/{trackingNumber}/location")
    public ResponseEntity<ApiResponse<ShipmentLatitudeResponse>> getLocation( @PathVariable String trackingNumber) {

    	ShipmentLatitudeResponse response = shipmentLocationService.getLocation( trackingNumber );
        
        ApiResponse<ShipmentLatitudeResponse> apiResponse = new ApiResponse<>(true, "Shipment full location fetched", response);
        
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    // ================= GET LATEST LOCATION =================
    @GetMapping("/{trackingNumber}/location/latest")
    public ResponseEntity<ApiResponse<ShipmentLocationResponseDto>> getLatestLocation(  @PathVariable String trackingNumber) {

        ShipmentLocationResponseDto response =  shipmentLocationService.getLatestLocation(trackingNumber);
        
        ApiResponse<ShipmentLocationResponseDto> apiResponse = new ApiResponse<>(true, "Shipment latest location fetched", response);
        
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    
    
 // ================= CURRENT LOCATION → DELIVERY ROUTE =================
    @GetMapping("/{trackingNumber}/location/current-route")
    public ResponseEntity<Map<String, Object>> getCurrentLocationToDeliveryRoute(
            @PathVariable String trackingNumber) {

        Map<String, Object> response =  shipmentLocationService.getCurrentLocationToDeliveryRoute(trackingNumber);

        return ResponseEntity .status(HttpStatus.OK).body(response);
    }

    // ================= GET LOCATION HISTORY =================
    @GetMapping("/{trackingNumber}/locations")
    public ResponseEntity<ApiResponse<List<ShipmentLocationResponseDto>>> getLocationHistory(   @PathVariable String trackingNumber) {

    	List<ShipmentLocationResponseDto> responseDtos =  shipmentLocationService.getLocationHistory( trackingNumber );
         
         ApiResponse<List<ShipmentLocationResponseDto>> apiResponse = new ApiResponse<>(true, "Shipment location history fetched", responseDtos);
         
         return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
         
    }
    
    
    // ================= GET ROAD FOLLOWING ROUTE HISTORY =================
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