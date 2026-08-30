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

    private String receiverName;

    private String receiverPhone;

    private String pickupAddress;

    private String deliveryAddress;

    private String packageDescription;

    private BigDecimal weight;

    private ShipmentStatus status;

    private LocalDateTime createdAt;
}