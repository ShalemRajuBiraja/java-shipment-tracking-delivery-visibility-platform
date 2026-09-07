package com.ship_track_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ship_track_backend.dto.OperatorDashboardResponse;
import com.ship_track_backend.enums.ShipmentStatus;
import com.ship_track_backend.pojo.UpdateShipmentStatusData;
import com.ship_track_backend.repository.ShipmentRepository;

import java.time.LocalDateTime;
import java.util.List;

import com.ship_track_backend.dto.ShipmentResponseDto;
import com.ship_track_backend.entity.ShipmentEntity;

@Service
public class LogisticsOperatorService {

    @Autowired
    private ShipmentRepository shipmentRepository;


    public OperatorDashboardResponse getDashboardStatistics() {

        OperatorDashboardResponse response =
                new OperatorDashboardResponse();


        response.setTotalShipments(
                shipmentRepository.count()
        );

        response.setCreated(
                shipmentRepository.countByStatus(
                        ShipmentStatus.CREATED
                )
        );

        response.setPickedUp(
                shipmentRepository.countByStatus(
                        ShipmentStatus.PICKED_UP
                )
        );

        response.setInTransit(
                shipmentRepository.countByStatus(
                        ShipmentStatus.IN_TRANSIT
                )
        );

        response.setOutForDelivery(
                shipmentRepository.countByStatus(
                        ShipmentStatus.OUT_FOR_DELIVERY
                )
        );

        response.setDelivered(
                shipmentRepository.countByStatus(
                        ShipmentStatus.DELIVERED
                )
        );

        response.setCancelled(
                shipmentRepository.countByStatus(
                        ShipmentStatus.CANCELLED
                )
        );

        return response;
    }
    
    public List<ShipmentResponseDto> getAllShipments() {

        List<ShipmentEntity> shipments =
                shipmentRepository.findAll();

        return shipments.stream()
                .map(this::convertToShipmentResponse)
                .toList();
    }
    
    private ShipmentResponseDto convertToShipmentResponse(
            ShipmentEntity shipment) {

        ShipmentResponseDto response =
                new ShipmentResponseDto();

        response.setId(shipment.getId());

        response.setTrackingNumber(
                shipment.getTrackingNumber()
        );

        response.setSenderName(
                shipment.getSender().getName()
        );

        response.setReceiverName(
                shipment.getReceiverName()
        );

        response.setReceiverPhone(
                shipment.getReceiverPhone()
        );

        response.setPickupAddress(
                shipment.getPickupAddress()
        );

        response.setPickupCity(
                shipment.getPickupCity()
        );

        response.setPickupState(
                shipment.getPickupState()
        );

        response.setPickupPincode(
                shipment.getPickupPincode()
        );

        response.setDeliveryAddress(
                shipment.getDeliveryAddress()
        );

        response.setDeliveryCity(
                shipment.getDeliveryCity()
        );

        response.setDeliveryState(
                shipment.getDeliveryState()
        );

        response.setDeliveryPincode(
                shipment.getDeliveryPincode()
        );

        response.setPackageDescription(
                shipment.getPackageDescription()
        );

        response.setWeight(
                shipment.getWeight()
        );

        response.setStatus(
                shipment.getStatus()
        );

        if (shipment.getAssignedOperator() != null) {
            response.setAssignedOperatorName(
                    shipment.getAssignedOperator().getName()
            );
        }

        response.setCreatedAt(
                shipment.getCreatedAt()
        );

        response.setUpdatedAt(
                shipment.getUpdatedAt()
        );

        return response;
    }
    
    public ShipmentResponseDto getShipmentById(Long id) {

        ShipmentEntity shipment = shipmentRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Shipment not found with id: " + id
                ));

        return convertToShipmentResponse(shipment);
    }
    
    public ShipmentResponseDto updateShipmentStatus( Long id, UpdateShipmentStatusData updateData) {

        ShipmentEntity shipment = shipmentRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Shipment not found with id: " + id
                ));

        ShipmentStatus currentStatus = shipment.getStatus();

        ShipmentStatus newStatus = updateData.getStatus();


        if (!isValidStatusTransition(currentStatus, newStatus)) {
            throw new RuntimeException(
                    "Invalid status transition from "
                            + currentStatus
                            + " to "
                            + newStatus
            );
        }


        shipment.setStatus(newStatus);

        shipment.setUpdatedAt(LocalDateTime.now());

        ShipmentEntity updatedShipment =
                shipmentRepository.save(shipment);

        return convertToShipmentResponse(updatedShipment);
    }
    private boolean isValidStatusTransition(
            ShipmentStatus currentStatus,
            ShipmentStatus newStatus) {

        switch (currentStatus) {

            case CREATED:
                return newStatus == ShipmentStatus.PICKED_UP
                        || newStatus == ShipmentStatus.CANCELLED;

            case PICKED_UP:
                return newStatus == ShipmentStatus.IN_TRANSIT
                        || newStatus == ShipmentStatus.CANCELLED;

            case IN_TRANSIT:
                return newStatus == ShipmentStatus.OUT_FOR_DELIVERY;

            case OUT_FOR_DELIVERY:
                return newStatus == ShipmentStatus.DELIVERED;

            case DELIVERED:
            case CANCELLED:
                return false;

            default:
                return false;
        }
    }
}