package com.ship_track_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.ShipmentTrackingEntity;

@Repository
public interface ShipmentTrackingRepository
        extends JpaRepository<ShipmentTrackingEntity, Long> {

    List<ShipmentTrackingEntity>
    findByShipmentTrackingNumberOrderByCreatedAtAsc(
            String trackingNumber
    );


    // GET LATEST TRACKING LOCATION
    Optional<ShipmentTrackingEntity>
    findTopByShipmentTrackingNumberOrderByCreatedAtDesc(
            String trackingNumber
    );
}