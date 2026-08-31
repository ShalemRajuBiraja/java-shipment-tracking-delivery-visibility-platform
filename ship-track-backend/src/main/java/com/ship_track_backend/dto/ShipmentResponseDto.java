package com.ship_track_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.ship_track_backend.enums.ShipmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShipmentResponseDto {

    private Long id;

    private String trackingNumber;

    // Sender information
    private String senderName;

    private String senderEmail;

    // Receiver information
    private String receiverName;

    private String receiverPhone;

    // Shipment addresses
    private String pickupAddress;

    private String deliveryAddress;

    // Package information
    private String packageDescription;

    private BigDecimal weight;

    // Shipment status
    private ShipmentStatus status;

    // Assigned operator
    private String assignedOperatorName;

    // Dates
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}