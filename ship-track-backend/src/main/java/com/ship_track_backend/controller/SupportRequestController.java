package com.ship_track_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ship_track_backend.dto.SupportRequestDto;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.SupportRequestPojo;
import com.ship_track_backend.service.SupportRequestService;

import java.util.List;

@RestController
public class SupportRequestController {

	@Autowired
    private  SupportRequestService supportRequestService;

  

    // CREATE SUPPORT REQUEST

    @PostMapping("/api/support-requests")
    public ResponseEntity<ApiResponse<Void>> createSupportRequest( @RequestBody SupportRequestPojo supportRequestPojo) {

        supportRequestService.createSupportRequest(supportRequestPojo);
        
		ApiResponse<Void> apiResponse = new ApiResponse<>(true, "Support Request Submitted", null);
      
		return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }


    // GET ALL SUPPORT REQUESTS

    @GetMapping
    public ResponseEntity<List<SupportRequestDto>>
    getAllSupportRequests() {

        return ResponseEntity.ok(
                supportRequestService
                        .getAllSupportRequests()
        );
    }


    // GET SUPPORT REQUEST BY ID

    @GetMapping("/{id}")
    public ResponseEntity<SupportRequestDto>
    getSupportRequestById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                supportRequestService
                        .getSupportRequestById(id)
        );
    }


    // UPDATE STATUS

    @PutMapping("/{id}/status")
    public ResponseEntity<SupportRequestDto>
    updateStatus(

            @PathVariable Long id,

            @RequestParam String status) {

        return ResponseEntity.ok(
                supportRequestService
                        .updateStatus(id, status)
        );
    }


    // DELETE SUPPORT REQUEST

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteSupportRequest(
            @PathVariable Long id) {

        supportRequestService
                .deleteSupportRequest(id);

        return ResponseEntity.ok(
                "Support request deleted successfully"
        );
    }
}