package com.ship_track_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.ShipmentStatus;

@Repository
public interface ShipmentRepository extends JpaRepository<ShipmentEntity, Long> {


    List<ShipmentEntity> findByAssignedOperator(UserEntity assignedOperator);
    
    List<ShipmentEntity> findBySenderId_Email(String email);
    
    Optional<ShipmentEntity> findByTrackingNumber(String trackingNumber);
    
    List<ShipmentEntity> findByReceiverId_EmailAndStatusIn(  String email, List<ShipmentStatus> statuses );
    
    long countByStatus(ShipmentStatus status);

}