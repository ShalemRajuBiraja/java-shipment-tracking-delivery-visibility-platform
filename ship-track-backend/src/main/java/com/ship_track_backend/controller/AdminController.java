package com.ship_track_backend.controller;

import com.ship_track_backend.dto.AdminDashboardResponse;
import com.ship_track_backend.dto.AdminLoginResponse;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.AdminLoginRequest;
import com.ship_track_backend.pojo.AdminPasswordUpdateRequest;
import com.ship_track_backend.service.AdminService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    
    @PostMapping("/auth/admin/login")
    public ResponseEntity<AdminLoginResponse> login(
            @Valid @RequestBody AdminLoginRequest request
    ) {

        AdminLoginResponse response = adminService.login(request);

        return ResponseEntity.ok(response);
    }
    
    // ================= ADMIN DASHBOARD =================

    @GetMapping("api/admin/dashboard-stats")
    public ResponseEntity<?> getDashboardStats() {

        AdminDashboardResponse dashboardStats =  adminService.getDashboardStats();
        
        ApiResponse<AdminDashboardResponse> response = new ApiResponse<>(true, "Dashboard stats fetched successfully", dashboardStats);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("api/admin/dashboard-shipments")
    public ResponseEntity<?> getDashboardShipments() {

		var dashboardShipments =  adminService.getDashboardShipments();
		
		ApiResponse<?> response = new ApiResponse<>(true, "Dashboard shipments fetched successfully", dashboardShipments);

		return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @DeleteMapping("/api/admin/delete-shipment/{id}")
    public ResponseEntity<?> deleteShipment(@PathVariable Long id) {
    	
    	adminService.deleteShipment(id);
		
		ApiResponse<Void> response = new ApiResponse<>(true, "Shipment deleted successfully", null);
		
		return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @DeleteMapping("/api/admin/delete-user/{id}")
    public ResponseEntity<?> deleteUser(  @PathVariable Long id ) {

        adminService.deleteUser(id);

        ApiResponse<?> response = new ApiResponse<>( true, "User deleted successfully", null ); 

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @GetMapping("/api/admin/users")
    public ResponseEntity<?> getUsers() {

        var users = adminService.getUsers();

        ApiResponse<?> response = new ApiResponse<>( true,  "Users fetched successfully", users );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @PutMapping("/api/admin/update-password")
    public ResponseEntity<?> updateAdminPassword( @RequestBody AdminPasswordUpdateRequest adminPasswordUpdateRequest, 
    		Authentication authentication ) {

    	String emailString = authentication.getName();
		adminService.updateAdminPassword(adminPasswordUpdateRequest, emailString);

		ApiResponse<Void> response = new ApiResponse<>(true, "Admin password updated successfully", null);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
    

		
    
}
    
    