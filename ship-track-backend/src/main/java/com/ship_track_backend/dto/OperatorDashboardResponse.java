package com.ship_track_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OperatorDashboardResponse {

    private long totalShipments;

    private long created;

    private long pickedUp;

    private long inTransit;

    private long outForDelivery;

    private long delivered;

    private long cancelled;
}