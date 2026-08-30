package com.ship_track_backend.controller;

import com.ship_track_backend.dto.AdminLoginResponse;
import com.ship_track_backend.pojo.AdminLoginRequest;
import com.ship_track_backend.service.AdminService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(
            @Valid @RequestBody AdminLoginRequest request
    ) {

        AdminLoginResponse response = adminService.login(request);

        return ResponseEntity.ok(response);
    }
}