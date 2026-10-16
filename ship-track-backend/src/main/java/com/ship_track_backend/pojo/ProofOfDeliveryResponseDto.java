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
public class ProofOfDeliveryResponseDto {

    private String trackingNumber;
    private String senderName;
    private String receiverName;
    private String receiverPhone;
    private String deliveryAddress;
    private String packageDescription;
    private String confirmedByName;
    private LocalDateTime confirmedAt;
    private String deliveryStatus;
    private boolean signatureCaptured;
    private boolean signatureVerified;
    private boolean podGenerated;
}
