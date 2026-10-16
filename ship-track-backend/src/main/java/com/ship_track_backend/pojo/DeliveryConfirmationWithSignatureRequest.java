package com.ship_track_backend.pojo;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for delivery confirmation with optional signature data.
 * Used when customers confirm delivery and optionally provide a digital signature.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryConfirmationWithSignatureRequest {
    
    private String confirmedByName;
    
    @Size(max = 6000000, message = "Signature data too large")
    private String signatureData; // base64 encoded PNG signature (optional)
}