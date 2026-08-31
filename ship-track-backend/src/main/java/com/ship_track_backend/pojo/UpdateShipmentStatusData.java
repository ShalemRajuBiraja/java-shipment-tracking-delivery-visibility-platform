package com.ship_track_backend.pojo;

import com.ship_track_backend.enums.ShipmentStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateShipmentStatusData {

    @NotNull(message = "Shipment status is required")
    private ShipmentStatus status;
}