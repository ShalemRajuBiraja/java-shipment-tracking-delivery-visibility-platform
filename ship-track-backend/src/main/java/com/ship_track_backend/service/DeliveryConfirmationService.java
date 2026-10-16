package com.ship_track_backend.service;

import java.time.LocalDateTime;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.ship_track_backend.entity.DeliveryConfirmationEntity;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.Role;
import com.ship_track_backend.enums.ShipmentStatus;
import com.ship_track_backend.pojo.DeliveryConfirmationResponseDto;
import com.ship_track_backend.pojo.DeliveryConfirmationWithSignatureRequest;
import com.ship_track_backend.pojo.PODGenerationRequest;
import com.ship_track_backend.pojo.ProofOfDeliveryResponseDto;
import com.ship_track_backend.repository.DeliveryConfirmationRepository;
import com.ship_track_backend.repository.ShipmentRepository;
import com.ship_track_backend.repository.UserRepository;

@Service
public class DeliveryConfirmationService {

    private final DeliveryConfirmationRepository deliveryConfirmationRepository;
    private final ShipmentRepository shipmentRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final SignatureFileService signatureFileService;
    private final PODGenerationService podGenerationService;

    public DeliveryConfirmationService(
            DeliveryConfirmationRepository deliveryConfirmationRepository,
            ShipmentRepository shipmentRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            SignatureFileService signatureFileService,
            PODGenerationService podGenerationService) {

        this.deliveryConfirmationRepository = deliveryConfirmationRepository;
        this.shipmentRepository = shipmentRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.signatureFileService = signatureFileService;
        this.podGenerationService = podGenerationService;
    }

    // ================= OPEN DELIVERY CONFIRMATION =================

    public DeliveryConfirmationEntity openDeliveryConfirmation(
            String trackingNumber) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        ShipmentEntity shipment = shipmentRepository
                .findByTrackingNumber(trackingNumber)
                .orElseThrow(() ->
                        new RuntimeException("Shipment not found"));

        UserEntity operator = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Operator not found"));

        UserEntity customer = shipment.getReceiver();

        if (customer == null) {
            throw new RuntimeException(
                    "No customer is associated with this shipment");
        }

        if (deliveryConfirmationRepository
                .findByShipment_TrackingNumber(trackingNumber)
                .isPresent()) {

            throw new RuntimeException(
                    "Delivery confirmation already exists for this shipment");
        }

        DeliveryConfirmationEntity confirmation =
                new DeliveryConfirmationEntity();

        confirmation.setShipment(shipment);
        confirmation.setCustomer(customer);
        confirmation.setOperator(operator);
        confirmation.setConfirmed(false);

        DeliveryConfirmationEntity savedConfirmation =
                deliveryConfirmationRepository.save(confirmation);

        notificationService.createNotification(
                customer,
                shipment,
                "Delivery Confirmation Required"
        );

        return savedConfirmation;
    }

    // ================= CONFIRM DELIVERY =================

    public DeliveryConfirmationResponseDto confirmDelivery(
            String trackingNumber) {

        return confirmDelivery(trackingNumber, null);
    }

    public DeliveryConfirmationResponseDto confirmDelivery(
            String trackingNumber,
            DeliveryConfirmationWithSignatureRequest request) {

        DeliveryConfirmationEntity confirmation =
                deliveryConfirmationRepository
                        .findByShipment_TrackingNumber(trackingNumber)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Delivery confirmation request not found"
                                ));

        if (confirmation.isConfirmed()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Delivery has already been confirmed"
            );
        }

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity customer = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Customer not found"
                        ));

        if (!confirmation.getCustomer().getId()
                .equals(customer.getId())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to confirm this delivery"
            );
        }

        String signaturePath = null;

        if (request != null && StringUtils.hasText(request.getSignatureData())) {
            if (!signatureFileService.validateSignatureData(request.getSignatureData())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid signature data"
                );
            }
            signaturePath = signatureFileService.saveSignatureFile(
                    request.getSignatureData(),
                    trackingNumber
            );
            confirmation.setSignaturePath(signaturePath);
        }

        String confirmedByName = customer.getName();
        if (request != null && StringUtils.hasText(request.getConfirmedByName())) {
            confirmedByName = request.getConfirmedByName();
        }

        confirmation.setConfirmed(true);
        confirmation.setConfirmedByName(confirmedByName);
        confirmation.setConfirmedAt(LocalDateTime.now());

        ShipmentEntity shipment = confirmation.getShipment();
        shipment.setStatus(ShipmentStatus.DELIVERED);
        shipment.setUpdatedAt(LocalDateTime.now());
        shipmentRepository.save(shipment);

        if (signaturePath != null) {
            try {
                PODGenerationRequest podRequest = new PODGenerationRequest(
                        confirmation,
                        shipment,
                        signaturePath
                );
                String podPath = podGenerationService.generatePODDocument(podRequest);
                confirmation.setPodFilePath(podPath);
            } catch (RuntimeException ex) {
                // Allow confirmation to complete even if POD generation fails
            }
        }

        DeliveryConfirmationEntity savedConfirmation =
                deliveryConfirmationRepository.save(confirmation);

        return toResponseDto(savedConfirmation, shipment);
    }

    // ================= PROOF OF DELIVERY =================

    public ProofOfDeliveryResponseDto getProofOfDelivery(String trackingNumber) {
        DeliveryConfirmationEntity confirmation = getConfirmationForAccess(trackingNumber);
        ShipmentEntity shipment = confirmation.getShipment();

        boolean signatureCaptured = StringUtils.hasText(confirmation.getSignaturePath());
        boolean signatureVerified = signatureCaptured
                && verifyStoredSignature(confirmation.getSignaturePath());

        return new ProofOfDeliveryResponseDto(
                shipment.getTrackingNumber(),
                shipment.getSender() != null ? shipment.getSender().getName() : null,
                shipment.getReceiverName(),
                shipment.getReceiverPhone(),
                shipment.getDeliveryAddress(),
                shipment.getPackageDescription(),
                confirmation.getConfirmedByName(),
                confirmation.getConfirmedAt(),
                shipment.getStatus().name(),
                signatureCaptured,
                signatureVerified,
                StringUtils.hasText(confirmation.getPodFilePath())
        );
    }

    public Resource downloadPod(String trackingNumber) {
        DeliveryConfirmationEntity confirmation = getConfirmationForAccess(trackingNumber);

        if (!StringUtils.hasText(confirmation.getPodFilePath())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Proof of delivery document is not available"
            );
        }

        return podGenerationService.getPODDocument(confirmation.getPodFilePath());
    }

    public Resource downloadSignature(String trackingNumber) {
        DeliveryConfirmationEntity confirmation = getConfirmationForAccess(trackingNumber);

        if (!StringUtils.hasText(confirmation.getSignaturePath())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Signature is not available for this delivery"
            );
        }

        return signatureFileService.getSignatureFile(confirmation.getSignaturePath());
    }

    public boolean verifySignatureForShipment(String trackingNumber) {
        DeliveryConfirmationEntity confirmation =
                deliveryConfirmationRepository
                        .findByShipment_TrackingNumber(trackingNumber)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Delivery confirmation not found"
                                ));

        if (!StringUtils.hasText(confirmation.getSignaturePath())) {
            return false;
        }

        return verifyStoredSignature(confirmation.getSignaturePath());
    }

    private boolean verifyStoredSignature(String signaturePath) {
        try {
            signatureFileService.getSignatureFile(signaturePath);
            return true;
        } catch (RuntimeException ex) {
            return false;
        }
    }

    private DeliveryConfirmationEntity getConfirmationForAccess(String trackingNumber) {
        DeliveryConfirmationEntity confirmation =
                deliveryConfirmationRepository
                        .findByShipment_TrackingNumber(trackingNumber)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Delivery confirmation not found"
                                ));

        if (!confirmation.isConfirmed()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Delivery has not been confirmed yet"
            );
        }

        assertCanAccessConfirmation(confirmation);
        return confirmation;
    }

    private void assertCanAccessConfirmation(DeliveryConfirmationEntity confirmation) {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "User not found"
                        ));

        Role role = user.getRole();
        if (role == Role.ADMIN || role == Role.LOGISTICS_OPERATOR) {
            return;
        }

        if (role == Role.CUSTOMER
                && confirmation.getCustomer().getId().equals(user.getId())) {
            return;
        }

        if (role == Role.BUSINESS_CLIENT
                && confirmation.getShipment().getSender() != null
                && confirmation.getShipment().getSender().getId().equals(user.getId())) {
            return;
        }

        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "You are not authorized to view this proof of delivery"
        );
    }

    private DeliveryConfirmationResponseDto toResponseDto(
            DeliveryConfirmationEntity confirmation,
            ShipmentEntity shipment) {

        return new DeliveryConfirmationResponseDto(
                confirmation.getId(),
                shipment.getTrackingNumber(),
                confirmation.isConfirmed(),
                confirmation.getConfirmedByName(),
                confirmation.getSignaturePath(),
                confirmation.getPodFilePath(),
                confirmation.getRequestedAt(),
                confirmation.getConfirmedAt(),
                shipment.getStatus().name()
        );
    }
}
