package com.ship_track_backend.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.UpdatePasswordRequest;
import com.ship_track_backend.service.PasswordService;

@RestController
@RequiredArgsConstructor
public class PasswordController {

	@Autowired
    private final PasswordService passwordService;


    @PutMapping("/api/update-password")
    public ResponseEntity<?> updatePassword( @RequestBody UpdatePasswordRequest updatePasswordRequest) {

        passwordService.updatePassword(updatePasswordRequest);
        
        ApiResponse<Void> response = new ApiResponse<>(true, "Password updated successfully", null);
        
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }
}