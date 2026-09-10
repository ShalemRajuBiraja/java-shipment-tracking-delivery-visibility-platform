package com.ship_track_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.ShipmentLocationEntity;

@Repository
public interface ShipmentLocationRepository
        extends JpaRepository<ShipmentLocationEntity, Long> {

    List<ShipmentLocationEntity>
    findByShipmentTrackingNumberOrderByRecordedAtAsc(
            String trackingNumber
    );

    Optional<ShipmentLocationEntity>
    findTopByShipmentTrackingNumberOrderByRecordedAtDesc(
            String trackingNumber
    );
}