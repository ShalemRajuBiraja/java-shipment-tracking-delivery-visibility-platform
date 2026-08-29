package com.ship_track_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.pojo.UserRegisterData;
import com.ship_track_backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
public class AuthController {
	
	@Autowired
	AuthService authService;
	
	
	@PostMapping("/auth/register")
	public ResponseEntity<ApiResponse<Void>> registerAccount( @Valid @RequestBody UserRegisterData userRegisterData) throws Exception {
		
		authService.registerAccount(userRegisterData);
		
		ApiResponse<Void> apiResponse = new ApiResponse<>(true, "User Registred successfully", null);
		
		
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}
	
	
//	@PostMapping("/auth/login")
//	public ResponseEntity<ApiResponse<LoginResponseDto>> login( @Valid  @RequestBody  LoginApiData loginApiData) {
//		
//	LoginResponseDto serviceResponse = 	authService.login(loginApiData);
//		
//	ApiResponse<LoginResponseDto> response = new ApiResponse<>(true, "Login Success", serviceResponse);
//	
//	return ResponseEntity.status(HttpStatus.OK).body(response);
//	
//	}//login closed

	


}
