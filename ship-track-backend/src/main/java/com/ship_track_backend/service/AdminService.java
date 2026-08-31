package com.ship_track_backend.service;

import com.ship_track_backend.dto.AdminLoginResponse;
import com.ship_track_backend.entity.AdminEntity;
import com.ship_track_backend.pojo.AdminLoginRequest;
import com.ship_track_backend.repository.AdminRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.http.HttpStatus;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    

    public AdminService(AdminRepository adminRepository,JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }
    public AdminLoginResponse login(AdminLoginRequest request) {

        AdminEntity admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Invalid admin email"
                        )
                );

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid password"
            );
        }

        if (!admin.getFavoriteTeacher().equals(request.getFavoriteTeacher())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid favorite teacher name"
            );
        }
        
        String jwtToken = jwtService.generateJwtToken(admin);

        AdminLoginResponse response = new AdminLoginResponse();

        response.setId(admin.getId());
        response.setEmail(admin.getEmail());
        response.setRole(admin.getRole());
        response.setToken(jwtToken);

        return response;
    }
}