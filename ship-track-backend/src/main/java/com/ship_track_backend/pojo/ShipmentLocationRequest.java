package com.ship_track_backend.pojo;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShipmentLocationRequest {

    @NotBlank(message = "New Location is required")
    private String newLocation;
}