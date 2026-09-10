package com.ship_track_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DelayPredictionResponseDto {

    private String trackingNumber;

    private String prediction;

    private Long expectedArrivalTime;

    private Long currentEstimatedArrivalTime;

    private Long delayMinutes;

    private String message;
}