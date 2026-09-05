package com.ship_track_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ship_track_backend.dto.SupportRequestResponse;
import com.ship_track_backend.dto.SupportStatsResponse;
import com.ship_track_backend.entity.SupportRequest;
import com.ship_track_backend.pojo.SupportRequestPojo;
import com.ship_track_backend.repository.SupportRequestRepository;

@Service
public class SupportRequestService {

    @Autowired
    private SupportRequestRepository supportRequestRepository;


    // ================= CREATE SUPPORT REQUEST =================

    public void createSupportRequest(
            SupportRequestPojo supportRequestPojo) {

        SupportRequest supportRequest =
                new SupportRequest();

        supportRequest.setName(
                supportRequestPojo.getName()
        );

        supportRequest.setPhoneNumber(
                supportRequestPojo.getPhoneNumber()
        );

        supportRequest.setIssue(
                supportRequestPojo.getIssue()
        );

        supportRequest.setDescription(
                supportRequestPojo.getDescription()
        );

        supportRequest.setStatus("OPEN");

        supportRequest.setCreatedAt(
                LocalDateTime.now()
        );

        supportRequestRepository.save(
                supportRequest
        );
    }


    // ================= GET ALL ACTIVE SUPPORT REQUESTS =================

    public List<SupportRequestResponse>
    getAllSupportRequests() {

        return supportRequestRepository.findAll()
                .stream()
                .filter(request ->
                        !request.getStatus()
                                .equals("RESOLVED")
                )
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // ================= GET SUPPORT REQUEST BY ID =================

    public SupportRequestResponse
    getSupportRequestById(Long id) {

        SupportRequest supportRequest =
                supportRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Support request not found"
                                )
                        );

        return convertToResponse(
                supportRequest
        );
    }


    // ================= SEARCH SUPPORT REQUESTS =================

    public List<SupportRequestResponse>
    searchSupportRequests(String name) {

        return supportRequestRepository
                .findByNameContainingIgnoreCase(name)
                .stream()
                .filter(request ->
                        !request.getStatus()
                                .equals("RESOLVED")
                )
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // ================= UPDATE REQUEST STATUS =================

    public SupportRequestResponse
    updateStatus(Long id, String status) {

        SupportRequest supportRequest =
                supportRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Support request not found"
                                )
                        );

        supportRequest.setStatus(
                status.toUpperCase()
        );

        SupportRequest updatedRequest =
                supportRequestRepository.save(
                        supportRequest
                );

        return convertToResponse(
                updatedRequest
        );
    }


    // ================= GET RESOLVED REQUESTS =================

    public List<SupportRequestResponse>
    getResolvedRequests() {

        return supportRequestRepository
                .findByStatus("RESOLVED")
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // ================= GET DASHBOARD STATISTICS =================

    public SupportStatsResponse
    getSupportRequestStats() {

        SupportStatsResponse stats =
                new SupportStatsResponse();

        stats.setTotalRequests(
                supportRequestRepository.count()
        );

        stats.setOpenRequests(
                supportRequestRepository
                        .countByStatus("OPEN")
        );

        stats.setInProgressRequests(
                supportRequestRepository
                        .countByStatus("IN_PROGRESS")
        );

        stats.setResolvedRequests(
                supportRequestRepository
                        .countByStatus("RESOLVED")
        );

        return stats;
    }


    // ================= DELETE SUPPORT REQUEST =================

    public void deleteSupportRequest(Long id) {

        if (!supportRequestRepository.existsById(id)) {

            throw new RuntimeException(
                    "Support request not found"
            );
        }

        supportRequestRepository.deleteById(id);
    }


    // ================= ENTITY TO RESPONSE =================

    private SupportRequestResponse
    convertToResponse(
            SupportRequest supportRequest) {

        SupportRequestResponse response =
                new SupportRequestResponse();

        response.setId(
                supportRequest.getId()
        );

        response.setName(
                supportRequest.getName()
        );

        response.setPhoneNumber(
                supportRequest.getPhoneNumber()
        );

        response.setIssue(
                supportRequest.getIssue()
        );

        response.setDescription(
                supportRequest.getDescription()
        );

        response.setStatus(
                supportRequest.getStatus()
        );

        response.setCreatedAt(
                supportRequest.getCreatedAt()
        );

        return response;
    }
}