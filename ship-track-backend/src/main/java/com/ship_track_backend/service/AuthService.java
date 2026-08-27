package com.ship_track_backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class AuthService {
	
	@Autowired
	AuthRepository authRepository;
	@Autowired
	JwtService jwtService;
	
	
// CREATE ACCOUNT FUNCTION	
	public void createAccount(CreateAccountApiData createAccountApiData) throws Exception {
		
	Optional<UserEntity> isEmailExists = authRepository.findByEmail(createAccountApiData.getEmail());
	Optional<UserEntity> isMobileExists = authRepository.findByMobileNumber(createAccountApiData.getMobileNumber());

	if (isEmailExists.isPresent()) {
	    throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
	}
	if (isMobileExists.isPresent()) {
	    throw new ResponseStatusException(HttpStatus.CONFLICT, "Mobile number alredy exists");
	}
		
		UserEntity userEntity = new UserEntity();
		userEntity.setFullName(createAccountApiData.getFullName());
		userEntity.setEmail(createAccountApiData.getEmail());
		userEntity.setMobileNumber(createAccountApiData.getMobileNumber());
		userEntity.setPassword(createAccountApiData.getPassword());
	
		authRepository.save(userEntity);
		
		
	}// create Account closed 
	
// LOGIN FUNCATION
	public LoginResponseDto login(LoginApiData loginApiData) {
		
		Optional<UserEntity> ifEmailExist =	authRepository.findByEmail(loginApiData.getEmail());
		
		if(ifEmailExist.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email is not registred");
		}
		
		UserEntity userData = ifEmailExist.get();

		
		if(!userData.getPassword().equals(loginApiData.getPassword())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
		}
		
		String jwtToken = jwtService.generateJwtToken(userData);
		
		Map<String, Object> response = new HashMap<>();
		response.put("token", jwtToken);
		response.put("userData", userData);
		
		LoginResponseDto loginResponseDto = new LoginResponseDto();
		loginResponseDto.setUserData(userData);
		loginResponseDto.setToken(jwtToken);
		
		return loginResponseDto;
		
	}//jogin closes
	
	// ADMIN LOGIN FUNCATION
		public LoginResponseDto adminLogin( AdminLoginApiData adminLoginApiData) {
			
			Optional<UserEntity> ifEmailExist =	authRepository.findByEmail(adminLoginApiData.getEmail());
			
			if(ifEmailExist.isEmpty()) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Credentials");
			}
			
			UserEntity adminData = ifEmailExist.get();

			
			if(!adminData.getPassword().equals(adminLoginApiData.getPassword())) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
			}
			
			
			if (!adminData.getRole().equals("ADMIN")) {
			        throw new ResponseStatusException(
			            HttpStatus.FORBIDDEN, "Access denied. Not an admin.");
			}
			 
			String jwtToken = jwtService.generateJwtToken(adminData);
			
			Map<String, Object> response = new HashMap<>();
			response.put("token", jwtToken);
			response.put("adminData", adminData);
			
			LoginResponseDto loginResponseDto = new LoginResponseDto();
			loginResponseDto.setUserData(adminData);
			loginResponseDto.setToken(jwtToken);
			
			return loginResponseDto;
			
		}//jogin closes

}
