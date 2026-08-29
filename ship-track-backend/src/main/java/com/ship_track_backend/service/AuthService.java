package com.ship_track_backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ship_track_backend.dto.LoginResponseDto;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.Role;
import com.ship_track_backend.pojo.LoginApiData;
import com.ship_track_backend.pojo.UserRegisterData;
import com.ship_track_backend.repository.AuthRepository;


@Service
public class AuthService {
	
	@Autowired
	AuthRepository authRepository;	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	JwtService jwtService;
	
// REGISTER ACCOUNT FUNCTION	
	public void registerAccount(UserRegisterData userRegisterData) throws Exception {
		
	Optional<UserEntity> isEmailExists = authRepository.findByEmail(userRegisterData.getEmail());

	if (isEmailExists.isPresent()) {
	    throw new ResponseStatusException(HttpStatus.CONFLICT, "This Email already exists");
	}
		
		UserEntity userEntity = new UserEntity();
		userEntity.setName(userRegisterData.getName());
		userEntity.setEmail(userRegisterData.getEmail());
		userEntity.setRole(Role.valueOf(userRegisterData.getRole().toUpperCase()));	
		userEntity.setPassword(
			    passwordEncoder.encode(userRegisterData.getPassword())
				);
		
		authRepository.save(userEntity);
		
		
	}// create Account closed 
	
// LOGIN FUNCATION
	public LoginResponseDto login(LoginApiData loginApiData) {
		
		Optional<UserEntity> ifEmailExist =	authRepository.findByEmail(loginApiData.getEmail());
		
		if(ifEmailExist.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email is not registred");
		}
		
		UserEntity userData = ifEmailExist.get();

		
		if(!passwordEncoder.matches( loginApiData.getPassword(),
		        userData.getPassword())) {
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
//		public LoginResponseDto adminLogin( AdminLoginApiData adminLoginApiData) {
//			
//			Optional<UserEntity> ifEmailExist =	authRepository.findByEmail(adminLoginApiData.getEmail());
//			
//			if(ifEmailExist.isEmpty()) {
//				throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Credentials");
//			}
//			
//			UserEntity adminData = ifEmailExist.get();
//
//			
//			if(!adminData.getPassword().equals(adminLoginApiData.getPassword())) {
//				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
//			}
//			
//			
//			if (!adminData.getRole().equals("ADMIN")) {
//			        throw new ResponseStatusException(
//			            HttpStatus.FORBIDDEN, "Access denied. Not an admin.");
//			}
//			 
//			String jwtToken = jwtService.generateJwtToken(adminData);
//			
//			Map<String, Object> response = new HashMap<>();
//			response.put("token", jwtToken);
//			response.put("adminData", adminData);
//			
//			LoginResponseDto loginResponseDto = new LoginResponseDto();
//			loginResponseDto.setUserData(adminData);
//			loginResponseDto.setToken(jwtToken);
//			
//			return loginResponseDto;
//			
//		}//jogin closes

}
