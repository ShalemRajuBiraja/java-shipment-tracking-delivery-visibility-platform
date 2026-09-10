package com.ship_track_backend.repository;

import com.ship_track_backend.entity.SupportRequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportRequestRepository
        extends JpaRepository<SupportRequest, Long> {

    // COUNT REQUESTS BY STATUS
    long countByStatus(String status);


    // GET REQUESTS BY STATUS
    List<SupportRequest> findByStatus(String status);


    // SEARCH REQUESTS
    List<SupportRequest> findByNameContainingIgnoreCase(String name );
}