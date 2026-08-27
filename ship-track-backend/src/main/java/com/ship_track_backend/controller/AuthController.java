package com.ship_track_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
public class AuthController {
	
	@Autowired
	AuthService authService;
	
	
	@PostMapping("/auth/create-account")
	public ResponseEntity<ApiResponse<UserEntity>> createAccount( @Valid @RequestBody CreateAccountApiData createAccountApiData) throws Exception {
		
		authService.createAccount(createAccountApiData);
		
		ApiResponse<UserEntity> apiResponse = new ApiResponse<>(true, "Account created successfully", null);
		
		
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}
	
	@PostMapping("/auth/login")
	public ResponseEntity<ApiResponse<LoginResponseDto>> login( @Valid  @RequestBody  LoginApiData loginApiData) {
		
	LoginResponseDto serviceResponse = 	authService.login(loginApiData);
		
	ApiResponse<LoginResponseDto> response = new ApiResponse<>(true, "Login Success", serviceResponse);
	
	return ResponseEntity.status(HttpStatus.OK).body(response);
	
	}//login closed

	@PostMapping("/auth/admin/login")
	public ResponseEntity<ApiResponse<LoginResponseDto>> login( @Valid  @RequestBody  AdminLoginApiData adminLoginApiData) {
		
	LoginResponseDto serviceResponse = 	authService.adminLogin(adminLoginApiData);
		
	ApiResponse<LoginResponseDto> response = new ApiResponse<>(true, "Admin Login Success", serviceResponse);
	
	return ResponseEntity.status(HttpStatus.OK).body(response);
	
	}//login closed


}
