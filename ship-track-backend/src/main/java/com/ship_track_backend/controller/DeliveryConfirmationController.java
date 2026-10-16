package com.ship_track_backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.entity.DeliveryConfirmationEntity;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.DeliveryConfirmationResponseDto;
import com.ship_track_backend.pojo.DeliveryConfirmationWithSignatureRequest;
import com.ship_track_backend.pojo.ProofOfDeliveryResponseDto;
import com.ship_track_backend.service.DeliveryConfirmationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/delivery-confirmations")
public class DeliveryConfirmationController {

    private final DeliveryConfirmationService deliveryConfirmationService;

    public DeliveryConfirmationController(
            DeliveryConfirmationService deliveryConfirmationService) {

        this.deliveryConfirmationService = deliveryConfirmationService;
    }

    @PostMapping("/open/{trackingNumber}")
    public ResponseEntity<ApiResponse<DeliveryConfirmationEntity>> openDeliveryConfirmation(
            @PathVariable String trackingNumber) {

        DeliveryConfirmationEntity confirmation =
                deliveryConfirmationService.openDeliveryConfirmation(trackingNumber);

        ApiResponse<DeliveryConfirmationEntity> response = new ApiResponse<>(
                true,
                "Delivery confirmation opened successfully",
                confirmation
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/confirm/{trackingNumber}")
    public ResponseEntity<ApiResponse<DeliveryConfirmationResponseDto>> confirmDelivery(
            @PathVariable String trackingNumber,
            @RequestBody(required = false) @Valid
                    DeliveryConfirmationWithSignatureRequest request) {

        DeliveryConfirmationResponseDto confirmation =
                deliveryConfirmationService.confirmDelivery(trackingNumber, request);

        ApiResponse<DeliveryConfirmationResponseDto> response = new ApiResponse<>(
                true,
                "Delivery confirmed successfully",
                confirmation
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/pod/{trackingNumber}")
    public ResponseEntity<ApiResponse<ProofOfDeliveryResponseDto>> getProofOfDelivery(
            @PathVariable String trackingNumber) {

        ProofOfDeliveryResponseDto pod =
                deliveryConfirmationService.getProofOfDelivery(trackingNumber);

        ApiResponse<ProofOfDeliveryResponseDto> response = new ApiResponse<>(
                true,
                "Proof of delivery retrieved successfully",
                pod
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/pod/{trackingNumber}/download")
    public ResponseEntity<Resource> downloadPod(@PathVariable String trackingNumber) {
        Resource resource = deliveryConfirmationService.downloadPod(trackingNumber);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"pod-" + trackingNumber + ".pdf\""
                )
                .body(resource);
    }

    @GetMapping("/signature/{trackingNumber}")
    public ResponseEntity<Resource> downloadSignature(
            @PathVariable String trackingNumber) {

        Resource resource =
                deliveryConfirmationService.downloadSignature(trackingNumber);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"signature-" + trackingNumber + ".png\""
                )
                .body(resource);
    }

    @GetMapping("/signature/{trackingNumber}/verify")
    public ResponseEntity<ApiResponse<Boolean>> verifySignature(
            @PathVariable String trackingNumber) {

        boolean verified =
                deliveryConfirmationService.verifySignatureForShipment(trackingNumber);

        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                verified ? "Signature verified" : "Signature could not be verified",
                verified
        );
        return ResponseEntity.ok(response);
    }
}
