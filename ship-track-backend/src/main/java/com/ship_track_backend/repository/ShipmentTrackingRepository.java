package com.ship_track_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.ShipmentTrackingEntity;

@Repository
public interface ShipmentTrackingRepository
        extends JpaRepository<ShipmentTrackingEntity, Long> {

    List<ShipmentTrackingEntity>
    findByShipmentTrackingNumberOrderByCreatedAtAsc(String trackingNumber);
}