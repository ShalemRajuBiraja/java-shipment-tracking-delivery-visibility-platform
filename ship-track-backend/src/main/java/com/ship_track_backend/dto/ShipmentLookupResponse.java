package com.ship_track_backend.dto;

import com.ship_track_backend.enums.ShipmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShipmentLookupResponse {

    private String trackingNumber;

    private String customer;

    private ShipmentStatus status;

    private String origin;

    private String destination;

    private String currentLocation;
}