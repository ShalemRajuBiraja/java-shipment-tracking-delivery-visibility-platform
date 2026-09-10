package com.ship_track_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryForecastResponseDto {

    private String trackingNumber;

    private String currentStatus;

    private Long forecastedDeliveryTime;

    private Long estimatedTravelTimeMinutes;

    private Long estimatedDistanceMeters;

    private String forecast;

    private String message;
}