package com.ship_track_backend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.ShipmentTrackingEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.ShipmentStatus;
import com.ship_track_backend.pojo.CreateShipmentData;
import com.ship_track_backend.pojo.UpdateShipmentData;
import com.ship_track_backend.pojo.UpdateShipmentStatusData;
import com.ship_track_backend.repository.AuthRepository;
import com.ship_track_backend.repository.ShipmentRepository;
import com.ship_track_backend.repository.ShipmentTrackingRepository;
import com.ship_track_backend.repository.UserRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ship_track_backend.dto.ShipmentResponseDto;
import com.ship_track_backend.dto.TrackingHistoryDto;
import com.ship_track_backend.dto.TrackingResponseDto;
import com.ship_track_backend.enums.Role;
import com.ship_track_backend.dto.ShipmentLookupResponse;


@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ShipmentTrackingRepository shipmentTrackingRepository;
    @Autowired
    private AuthRepository authRepository;

    
    private String generateTrackingNumber() {

        return "SHP-" + System.currentTimeMillis();
    }
    

    @Transactional
    public void createShipment(CreateShipmentData createShipmentData) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        ShipmentEntity shipment = new ShipmentEntity();

        // ================= SENDER =================

        shipment.setSender(sender);


        // ================= RECEIVER DETAILS =================

        shipment.setReceiverName(
                createShipmentData.getReceiverName()
        );

        shipment.setReceiverPhone(
                createShipmentData.getReceiverPhone()
        );


        // ================= PICKUP LOCATION =================

        shipment.setPickupAddress(
                createShipmentData.getPickupAddress()
        );

        shipment.setPickupCity(
                createShipmentData.getPickupCity()
        );

        shipment.setPickupState(
                createShipmentData.getPickupState()
        );

        shipment.setPickupPincode(
                createShipmentData.getPickupPincode()
        );


        // ================= DELIVERY LOCATION =================

        shipment.setDeliveryAddress(
                createShipmentData.getDeliveryAddress()
        );

        shipment.setDeliveryCity(
                createShipmentData.getDeliveryCity()
        );

        shipment.setDeliveryState(
                createShipmentData.getDeliveryState()
        );

        shipment.setDeliveryPincode(
                createShipmentData.getDeliveryPincode()
        );


        // ================= PACKAGE DETAILS =================

        shipment.setPackageDescription(
                createShipmentData.getPackageDescription()
        );

        shipment.setWeight(
                createShipmentData.getWeight()
        );


        // ================= STATUS =================

        shipment.setStatus(
                ShipmentStatus.CREATED
        );


        // ================= TIMESTAMPS =================

        shipment.setCreatedAt(
                LocalDateTime.now()
        );

        shipment.setUpdatedAt(
                LocalDateTime.now()
        );


        // ================= TRACKING NUMBER =================

        shipment.setTrackingNumber(
                generateTrackingNumber()
        );


        // ================= SAVE SHIPMENT =================

        ShipmentEntity savedShipment =
                shipmentRepository.save(shipment);


        // ================= INITIAL TRACKING HISTORY =================

        ShipmentTrackingEntity tracking =
                new ShipmentTrackingEntity();

        tracking.setShipment(savedShipment);

        tracking.setStatus(
                ShipmentStatus.CREATED
        );

        // More meaningful than only the street address
        tracking.setLocation(
                savedShipment.getPickupCity()
                        + ", "
                        + savedShipment.getPickupState()
        );

        tracking.setDescription(
                "Shipment created"
        );

        tracking.setUpdatedBy(sender);

        tracking.setCreatedAt(
                LocalDateTime.now()
        );

        shipmentTrackingRepository.save(tracking);
    }
    
    public List<ShipmentResponseDto> getAllShipments(String email) {


        List<ShipmentEntity> shipments =
                shipmentRepository.findBySenderId_Email(email);


        return shipments.stream()
                .map(shipment -> {

                    ShipmentResponseDto responseDto =
                            new ShipmentResponseDto();

                    responseDto.setId(shipment.getId());
                    responseDto.setTrackingNumber(shipment.getTrackingNumber());

                    responseDto.setSenderName(
                            shipment.getSender().getName()
                    );

                    responseDto.setReceiverName(shipment.getReceiverName());
                    responseDto.setReceiverPhone(shipment.getReceiverPhone());

                    responseDto.setPickupAddress(shipment.getPickupAddress());
                    responseDto.setDeliveryAddress(shipment.getDeliveryAddress());

                    responseDto.setPackageDescription(
                            shipment.getPackageDescription()
                    );

                    responseDto.setWeight(shipment.getWeight());

                    responseDto.setStatus(shipment.getStatus());

                    if (shipment.getAssignedOperator() != null) {
                        responseDto.setAssignedOperatorName(
                                shipment.getAssignedOperator().getName()
                        );
                    }

                    responseDto.setCreatedAt(shipment.getCreatedAt());
                    responseDto.setUpdatedAt(shipment.getUpdatedAt());

                    return responseDto;
                })
                .collect(Collectors.toList());
    }
    
    public TrackingResponseDto getTrackingDetails(String trackingNumber) {

        // Find shipment
        ShipmentEntity shipment = shipmentRepository
                .findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tracking number not found"
                ));

        // Find tracking history
        List<ShipmentTrackingEntity> trackingRecords =
                shipmentTrackingRepository
                        .findByShipmentTrackingNumberOrderByCreatedAtAsc(
                                trackingNumber
                        );

        // Create response
        TrackingResponseDto response = new TrackingResponseDto();

        response.setTrackingNumber(shipment.getTrackingNumber());

        response.setCurrentStatus(shipment.getStatus());

        response.setCreatedAt(shipment.getCreatedAt());

        response.setSenderName(shipment.getSender().getName());

        response.setReceiverName(shipment.getReceiverName());

        response.setReceiverPhone(shipment.getReceiverPhone());

        response.setPackageDescription(shipment.getPackageDescription());

        response.setWeight(shipment.getWeight());

        response.setPickupAddress(shipment.getPickupAddress());

        response.setDeliveryAddress(shipment.getDeliveryAddress());

        // Convert tracking entities to DTO
        List<TrackingHistoryDto> trackingHistory =
                trackingRecords.stream()
                        .map(tracking -> {

                            TrackingHistoryDto historyDto =
                                    new TrackingHistoryDto();

                            historyDto.setStatus(tracking.getStatus());
                            historyDto.setLocation(tracking.getLocation());
                            historyDto.setDescription(
                                    tracking.getDescription()
                            );
                            historyDto.setCreatedAt(
                                    tracking.getCreatedAt()
                            );

                            return historyDto;
                        })
                        .collect(Collectors.toList());

        response.setTrackingHistory(trackingHistory);

        return response;
    }
    
    
 // ================= SUPPORT AGENT SHIPMENT LOOKUP =================

    public ShipmentLookupResponse getShipmentForSupportAgent(String trackingNumber) {

        // FIND SHIPMENT

        ShipmentEntity shipment =
                shipmentRepository
                        .findByTrackingNumber(trackingNumber)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Shipment not found"
                                )
                        );


        // FIND LATEST TRACKING LOCATION

        ShipmentTrackingEntity latestTracking =
                shipmentTrackingRepository
                        .findTopByShipmentTrackingNumberOrderByCreatedAtDesc(
                                trackingNumber
                        )
                        .orElse(null);


        // CREATE RESPONSE

        ShipmentLookupResponse response =
                new ShipmentLookupResponse();

        response.setTrackingNumber(
                shipment.getTrackingNumber()
        );

        response.setCustomer(
                shipment.getSender().getName()
        );

        response.setStatus(
                shipment.getStatus()
        );

        response.setOrigin(
                shipment.getPickupCity()
        );

        response.setDestination(
                shipment.getDeliveryCity()
        );


        // SET CURRENT LOCATION

        if (latestTracking != null) {

            response.setCurrentLocation(
                    latestTracking.getLocation()
            );

        } else {

            response.setCurrentLocation(
                    shipment.getPickupCity()
            );
        }


        return response;
    }
    
    public ShipmentResponseDto getShipmentById(Long id) {

        // ================= FIND SHIPMENT =================

        ShipmentEntity shipment = shipmentRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Shipment not found"
                ));


        // ================= CREATE RESPONSE DTO =================

        ShipmentResponseDto responseDto = new ShipmentResponseDto();


        // ================= BASIC DETAILS =================

        responseDto.setId(shipment.getId());

        responseDto.setTrackingNumber(shipment.getTrackingNumber());

			// ================= SENDER =================
			responseDto.setSenderName(shipment.getSender().getName());
			 // ================= RECEIVER =================
			 responseDto.setReceiverName(shipment.getReceiverName());
			 responseDto.setReceiverPhone(shipment.getReceiverPhone());
			// ================= PICKUP LOCATION =================
			responseDto.setPickupAddress(shipment.getPickupAddress());
			 responseDto.setPickupCity(shipment.getPickupCity());
			 responseDto.setPickupState(shipment.getPickupState());
			 responseDto.setPickupPincode(shipment.getPickupPincode());
			 // ================= DELIVERY LOCATION =================
			responseDto.setDeliveryAddress(shipment.getDeliveryAddress());
			responseDto.setDeliveryCity(shipment.getDeliveryCity());
			 responseDto.setDeliveryState(shipment.getDeliveryState());
			 responseDto.setDeliveryPincode(shipment.getDeliveryPincode());
			// ================= PACKAGE DETAILS =================
			responseDto.setPackageDescription(shipment.getPackageDescription());
			responseDto.setWeight(shipment.getWeight());
			// ================= STATUS =================
			responseDto.setStatus(shipment.getStatus());
			// ================= ASSIGNED OPERATOR =================

 if (shipment.getAssignedOperator() != null) {

            responseDto.setAssignedOperatorName(
                    shipment.getAssignedOperator().getName()
            );
        }


        // ================= DATES =================

        responseDto.setCreatedAt(shipment.getCreatedAt());

        responseDto.setUpdatedAt(shipment.getUpdatedAt());


        return responseDto;
    }
    
    public List<ShipmentResponseDto> getShipmentHistory(String email) {

        List<ShipmentStatus> historyStatuses = List.of(
                ShipmentStatus.DELIVERED,
                ShipmentStatus.CANCELLED
        );

        List<ShipmentEntity> shipments =
                shipmentRepository.findByReceiverId_EmailAndStatusIn(
                        email,
                        historyStatuses
                );

        return shipments.stream()
                .map(shipment -> {

                    ShipmentResponseDto dto = new ShipmentResponseDto();

                    // Use your existing DTO mapping code here

                    dto.setId(shipment.getId());
                    dto.setTrackingNumber(shipment.getTrackingNumber());
                    dto.setReceiverName(shipment.getReceiverName());
                    dto.setPickupCity(shipment.getPickupCity());
                    dto.setDeliveryCity(shipment.getDeliveryCity());
                    dto.setStatus(shipment.getStatus());
                    dto.setCreatedAt(shipment.getCreatedAt());
                    dto.setUpdatedAt(shipment.getUpdatedAt());

                    return dto;

                })
                .toList();
    }
    
 
}