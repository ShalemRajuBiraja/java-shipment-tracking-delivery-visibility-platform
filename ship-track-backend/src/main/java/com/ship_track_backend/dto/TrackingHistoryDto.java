package com.ship_track_backend.dto;

import java.time.LocalDateTime;

import com.ship_track_backend.enums.ShipmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrackingHistoryDto {

    private ShipmentStatus status;

    private String location;

    private String description;

    private LocalDateTime createdAt;
}