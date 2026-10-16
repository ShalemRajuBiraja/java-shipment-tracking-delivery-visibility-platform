package com.ship_track_backend.pojo;

import com.ship_track_backend.entity.DeliveryConfirmationEntity;
import com.ship_track_backend.entity.ShipmentEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PODGenerationRequest {

    private DeliveryConfirmationEntity confirmation;
    private ShipmentEntity shipment;
    private String signaturePath;
}
