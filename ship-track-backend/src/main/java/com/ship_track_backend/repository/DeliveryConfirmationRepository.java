package com.ship_track_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.DeliveryConfirmationEntity;

@Repository
public interface DeliveryConfirmationRepository extends JpaRepository<DeliveryConfirmationEntity, Long> {

    Optional<DeliveryConfirmationEntity> findByShipment_TrackingNumber(String trackingNumber);

}