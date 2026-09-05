package com.ship_track_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.SupportRequest;

@Repository
public interface SupportRequestRepository extends JpaRepository<SupportRequest, Long> {

}