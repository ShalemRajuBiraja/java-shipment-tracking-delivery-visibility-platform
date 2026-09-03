package com.ship_track_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;

@Repository
public interface ShipmentRepository extends JpaRepository<ShipmentEntity, Long> {

    List<ShipmentEntity> findBySender(UserEntity sender);

    List<ShipmentEntity> findByAssignedOperator(UserEntity assignedOperator);
    
    List<ShipmentEntity> findBySender_Email(String email);


}