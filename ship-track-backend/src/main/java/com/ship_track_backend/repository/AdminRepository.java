package com.ship_track_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ship_track_backend.entity.AdminEntity;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<AdminEntity, Long> {

    Optional<AdminEntity> findByEmail(String email);

}