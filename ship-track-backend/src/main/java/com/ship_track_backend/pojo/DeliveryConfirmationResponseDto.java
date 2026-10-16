package com.ship_track_backend.pojo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryConfirmationResponseDto {

    private Long id;

    private String trackingNumber;

    private boolean confirmed;

    private String confirmedByName;

    private String signaturePath;

    private String podFilePath;

    private LocalDateTime requestedAt;

    private LocalDateTime confirmedAt;

    private String shipmentStatus;
}