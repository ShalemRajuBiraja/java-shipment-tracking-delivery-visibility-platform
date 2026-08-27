package com.ship_track_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AuthRepository extends JpaRepository<UserEntity, Long> {
	
	Optional<UserEntity> findByEmail(String email);
	Optional<UserEntity> findByMobileNumber(String mobileNumber);


}
