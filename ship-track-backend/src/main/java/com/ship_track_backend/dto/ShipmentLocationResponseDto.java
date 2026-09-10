package com.ship_track_backend.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShipmentLocationResponseDto {

    private Long id;

    private String trackingNumber;

    private Double latitude;

    private Double longitude;

    private LocalDateTime recordedAt;
}