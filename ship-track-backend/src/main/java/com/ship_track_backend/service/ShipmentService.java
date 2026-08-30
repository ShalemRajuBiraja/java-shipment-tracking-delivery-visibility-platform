package com.ship_track_backend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.ShipmentStatus;
import com.ship_track_backend.pojo.CreateShipmentData;
import com.ship_track_backend.pojo.UpdateShipmentData;
import com.ship_track_backend.repository.ShipmentRepository;
import com.ship_track_backend.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

import com.ship_track_backend.dto.ShipmentResponseDto;
import com.ship_track_backend.enums.Role;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private UserRepository userRepository;

    private String generateTrackingNumber() {

        return "SHP-" + System.currentTimeMillis();
    }

    public void createShipment(CreateShipmentData createShipmentData) {

        // Get currently logged-in user's email
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Find logged-in Business Client
        UserEntity sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        // Create shipment entity
        ShipmentEntity shipment = new ShipmentEntity();

        shipment.setSender(sender);

        shipment.setReceiverName(createShipmentData.getReceiverName());

        shipment.setReceiverPhone(createShipmentData.getReceiverPhone());
        
        shipment.setPickupAddress(createShipmentData.getPickupAddress() );
        
        shipment.setDeliveryAddress(createShipmentData.getDeliveryAddress() );
        
        shipment.setPackageDescription( createShipmentData.getPackageDescription() );

        shipment.setWeight(createShipmentData.getWeight() );

        shipment.setStatus(ShipmentStatus.CREATED);

        shipment.setCreatedAt(LocalDateTime.now());

        shipment.setUpdatedAt(LocalDateTime.now());

        shipment.setTrackingNumber(generateTrackingNumber());
        
        // Save shipment
        shipmentRepository.save(shipment);
    }
    
    public List<ShipmentResponseDto> getAllShipments() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        List<ShipmentEntity> shipments;

        if (loggedInUser.getRole() == Role.ADMIN ||
                loggedInUser.getRole() == Role.SUPPORT_AGENT) {

            shipments = shipmentRepository.findAll();

        } else if (loggedInUser.getRole() == Role.BUSINESS_CLIENT) {

            shipments = shipmentRepository.findBySender(loggedInUser);

        } else if (loggedInUser.getRole() == Role.LOGISTICS_OPERATOR) {

            shipments = shipmentRepository.findByAssignedOperator(loggedInUser);

        } else {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to view shipments"
            );
        }

        return shipments.stream()
                .map(shipment -> {

                    ShipmentResponseDto response = new ShipmentResponseDto();

                    response.setId(shipment.getId());
                    response.setTrackingNumber(shipment.getTrackingNumber());
                    response.setReceiverName(shipment.getReceiverName());
                    response.setReceiverPhone(shipment.getReceiverPhone());
                    response.setPickupAddress(shipment.getPickupAddress());
                    response.setDeliveryAddress(shipment.getDeliveryAddress());
                    response.setPackageDescription(shipment.getPackageDescription());
                    response.setWeight(shipment.getWeight());
                    response.setStatus(shipment.getStatus());
                    response.setCreatedAt(shipment.getCreatedAt());

                    return response;
                })
                .collect(Collectors.toList());
    }
    
    public ShipmentResponseDto getShipmentById(Long shipmentId) {

        ShipmentEntity shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Shipment not found"
                ));

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        boolean hasAccess = false;

        if (loggedInUser.getRole() == Role.ADMIN ||
                loggedInUser.getRole() == Role.SUPPORT_AGENT) {

            hasAccess = true;

        } else if (loggedInUser.getRole() == Role.BUSINESS_CLIENT) {

            hasAccess = shipment.getSender()
                    .getId()
                    .equals(loggedInUser.getId());

        } else if (loggedInUser.getRole() == Role.LOGISTICS_OPERATOR) {

            hasAccess = shipment.getAssignedOperator() != null &&
                    shipment.getAssignedOperator()
                            .getId()
                            .equals(loggedInUser.getId());
        }

        if (!hasAccess) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to view this shipment"
            );
        }

        ShipmentResponseDto response = new ShipmentResponseDto();

        response.setId(shipment.getId());
        response.setTrackingNumber(shipment.getTrackingNumber());
        response.setReceiverName(shipment.getReceiverName());
        response.setReceiverPhone(shipment.getReceiverPhone());
        response.setPickupAddress(shipment.getPickupAddress());
        response.setDeliveryAddress(shipment.getDeliveryAddress());
        response.setPackageDescription(shipment.getPackageDescription());
        response.setWeight(shipment.getWeight());
        response.setStatus(shipment.getStatus());
        response.setCreatedAt(shipment.getCreatedAt());

        return response;
    }
    
    public void updateShipment(Long shipmentId, UpdateShipmentData updateShipmentData) {

        // Find shipment
        ShipmentEntity shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Shipment not found"
                ));

        // Get logged-in user's email
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Find logged-in user
        UserEntity loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        // Check authorization
        boolean isAdmin = loggedInUser.getRole() == Role.ADMIN;

        boolean isShipmentOwner =
                shipment.getSender().getId().equals(loggedInUser.getId());

        if (!isAdmin && !isShipmentOwner) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to update this shipment"
            );
        }

        // Business client can update only when shipment is CREATED
        if (!isAdmin && shipment.getStatus() != ShipmentStatus.CREATED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Shipment cannot be updated after processing has started"
            );
        }

        // Update shipment details
        shipment.setReceiverName(updateShipmentData.getReceiverName());
        shipment.setReceiverPhone(updateShipmentData.getReceiverPhone());
        shipment.setPickupAddress(updateShipmentData.getPickupAddress());
        shipment.setDeliveryAddress(updateShipmentData.getDeliveryAddress());
        shipment.setPackageDescription(updateShipmentData.getPackageDescription());
        shipment.setWeight(updateShipmentData.getWeight());

        shipment.setUpdatedAt(LocalDateTime.now());

        shipmentRepository.save(shipment);
    }
    
    public void assignOperator(Long shipmentId) {

        // Get logged-in user's email
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Find logged-in user
        UserEntity loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        // Only ADMIN can assign operator
        if (loggedInUser.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only admin can assign logistics operator"
            );
        }

        // Find shipment
        ShipmentEntity shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Shipment not found"
                ));

        // Find the single logistics operator
        UserEntity operator = userRepository
                .findByRole(Role.LOGISTICS_OPERATOR)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Logistics operator not found"
                ));

        // Assign operator
        shipment.setAssignedOperator(operator);

        shipment.setUpdatedAt(LocalDateTime.now());

        shipmentRepository.save(shipment);
    }
    public void cancelShipment(Long shipmentId) {

        // Find shipment
        ShipmentEntity shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Shipment not found"
                ));

        // Get logged-in user's email
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Find logged-in user
        UserEntity loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        // Check authorization
        boolean isAdmin = loggedInUser.getRole() == Role.ADMIN;

        boolean isShipmentOwner =
                shipment.getSender().getId().equals(loggedInUser.getId());

        if (!isAdmin && !isShipmentOwner) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to cancel this shipment"
            );
        }

        // Prevent cancelling already delivered shipment
        if (shipment.getStatus() == ShipmentStatus.DELIVERED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Delivered shipment cannot be cancelled"
            );
        }

        // Prevent cancelling already cancelled shipment
        if (shipment.getStatus() == ShipmentStatus.CANCELLED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Shipment is already cancelled"
            );
        }

        // Cancel shipment
        shipment.setStatus(ShipmentStatus.CANCELLED);

        shipment.setUpdatedAt(LocalDateTime.now());

        shipmentRepository.save(shipment);
    }
}