package com.ship_track_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ship_track_backend.entity.UserEntity;

public interface AuthRepository extends JpaRepository<UserEntity, Long> {
	
Optional<UserEntity> findByEmail(String email);

}
