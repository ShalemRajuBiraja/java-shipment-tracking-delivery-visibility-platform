package com.ship_track_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ShipmentLatitudeResponse {
	
	private Double pickupLatitude;
    private Double pickupLongitude;
    private Double deliveryLatitude;
    private Double deliveryLongitude;
}
