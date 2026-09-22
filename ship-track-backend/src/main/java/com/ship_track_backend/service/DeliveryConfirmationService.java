package com.ship_track_backend.service;

import java.time.LocalDateTime;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ship_track_backend.entity.DeliveryConfirmationEntity;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.ShipmentStatus;
import com.ship_track_backend.pojo.DeliveryConfirmationResponseDto;
import com.ship_track_backend.repository.DeliveryConfirmationRepository;
import com.ship_track_backend.repository.ShipmentRepository;
import com.ship_track_backend.repository.UserRepository;

@Service
public class DeliveryConfirmationService {

    private final DeliveryConfirmationRepository deliveryConfirmationRepository;
    private final ShipmentRepository shipmentRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public DeliveryConfirmationService(
            DeliveryConfirmationRepository deliveryConfirmationRepository,
            ShipmentRepository shipmentRepository,
            UserRepository userRepository,
            NotificationService notificationService) {

        this.deliveryConfirmationRepository = deliveryConfirmationRepository;
        this.shipmentRepository = shipmentRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    // ================= OPEN DELIVERY CONFIRMATION =================

    public DeliveryConfirmationEntity openDeliveryConfirmation(
            String trackingNumber) {

        // Get logged-in operator
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Find shipment
        ShipmentEntity shipment = shipmentRepository
                .findByTrackingNumber(trackingNumber)
                .orElseThrow(() ->
                        new RuntimeException("Shipment not found"));

        // Get logged-in operator
        UserEntity operator = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Operator not found"));

        // Get customer
        UserEntity customer = shipment.getReceiver();

        if (customer == null) {

            throw new RuntimeException(
                    "No customer is associated with this shipment");
        }

        // Check whether confirmation already exists
        if (deliveryConfirmationRepository
                .findByShipment_TrackingNumber(trackingNumber)
                .isPresent()) {

            throw new RuntimeException(
                    "Delivery confirmation already exists for this shipment");
        }

        // Create delivery confirmation
        DeliveryConfirmationEntity confirmation =
                new DeliveryConfirmationEntity();

        confirmation.setShipment(shipment);
        confirmation.setCustomer(customer);
        confirmation.setOperator(operator);
        confirmation.setConfirmed(false);

        // Save confirmation
        DeliveryConfirmationEntity savedConfirmation =
                deliveryConfirmationRepository.save(confirmation);

        // Create notification for customer
        notificationService.createNotification(
                customer,
                shipment,
                "Delivery Confirmation Required"
        );

        return savedConfirmation;
    }


    // ================= CONFIRM DELIVERY =================

    public DeliveryConfirmationResponseDto confirmDelivery(
            String trackingNumber) {

        // Find delivery confirmation
        DeliveryConfirmationEntity confirmation =
                deliveryConfirmationRepository
                        .findByShipment_TrackingNumber(trackingNumber)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Delivery confirmation request not found"
                                ));

        // Check if already confirmed
        if (confirmation.isConfirmed()) {

            throw new RuntimeException(
                    "Delivery has already been confirmed"
            );
        }

        // Get logged-in customer
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity customer = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found"
                        ));

        // Make sure the logged-in customer
        // is the customer associated with this shipment
        if (!confirmation.getCustomer().getId()
                .equals(customer.getId())) {

            throw new RuntimeException(
                    "You are not authorized to confirm this delivery"
            );
        }

        // Confirm delivery
        confirmation.setConfirmed(true);

        confirmation.setConfirmedByName(
                customer.getName()
        );

        confirmation.setConfirmedAt(
                LocalDateTime.now()
        );

        // Get shipment
        ShipmentEntity shipment =
                confirmation.getShipment();

        // Update shipment status
        shipment.setStatus(
                ShipmentStatus.DELIVERED
        );

        shipment.setUpdatedAt(
                LocalDateTime.now()
        );

        shipmentRepository.save(shipment);

        // Save confirmation
        DeliveryConfirmationEntity savedConfirmation =
                deliveryConfirmationRepository.save(
                        confirmation
                );

        // Return safe DTO
        return new DeliveryConfirmationResponseDto(
                savedConfirmation.getId(),
                shipment.getTrackingNumber(),
                savedConfirmation.isConfirmed(),
                savedConfirmation.getConfirmedByName(),
                savedConfirmation.getRequestedAt(),
                savedConfirmation.getConfirmedAt(),
                shipment.getStatus().name()
        );
    }
}