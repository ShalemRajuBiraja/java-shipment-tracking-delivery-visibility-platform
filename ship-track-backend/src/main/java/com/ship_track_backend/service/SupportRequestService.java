package com.ship_track_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ship_track_backend.dto.SupportRequestDto;
import com.ship_track_backend.entity.SupportRequest;
import com.ship_track_backend.pojo.SupportRequestPojo;
import com.ship_track_backend.repository.SupportRequestRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupportRequestService {

	@Autowired
    private  SupportRequestRepository supportRequestRepository;


    // CREATE SUPPORT REQUEST

    public void createSupportRequest( SupportRequestPojo  supportRequestPojo) {

        SupportRequest supportRequest = new SupportRequest();

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

        System.out.println("Support request created: " + supportRequest);
        supportRequestRepository.save(supportRequest);
       System.out.println("Support request saved to the database." + supportRequest);

    }


    // GET ALL SUPPORT REQUESTS

    public List<SupportRequestDto> getAllSupportRequests() {

        return supportRequestRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    // GET SUPPORT REQUEST BY ID

    public SupportRequestDto getSupportRequestById(Long id) {

        SupportRequest supportRequest =
                supportRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Support request not found"
                                )
                        );

        return convertToDto(supportRequest);
    }


    // UPDATE STATUS

    public SupportRequestDto updateStatus(
            Long id,
            String status) {

        SupportRequest supportRequest =
                supportRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Support request not found"
                                )
                        );

        supportRequest.setStatus(status);

        SupportRequest updatedRequest =
                supportRequestRepository.save(supportRequest);

        return convertToDto(updatedRequest);
    }


    // DELETE SUPPORT REQUEST

    public void deleteSupportRequest(Long id) {

        if (!supportRequestRepository.existsById(id)) {

            throw new RuntimeException(
                    "Support request not found"
            );
        }

        supportRequestRepository.deleteById(id);
    }


    // ENTITY TO DTO

    private SupportRequestDto convertToDto(
            SupportRequest supportRequest) {

        SupportRequestDto dto =
                new SupportRequestDto();

        dto.setId(supportRequest.getId());

        dto.setName(supportRequest.getName());

        dto.setPhoneNumber(
                supportRequest.getPhoneNumber()
        );

        dto.setIssue(
                supportRequest.getIssue()
        );

        dto.setDescription(
                supportRequest.getDescription()
        );

        dto.setStatus(
                supportRequest.getStatus()
        );

        dto.setCreatedAt(
                supportRequest.getCreatedAt()
        );

        return dto;
    }
}