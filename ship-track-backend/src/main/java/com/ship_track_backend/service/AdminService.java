package com.ship_track_backend.service;

import com.ship_track_backend.dto.AdminDashboardResponse;
import com.ship_track_backend.dto.AdminLoginResponse;
import com.ship_track_backend.dto.ShipmentResponseDto;
import com.ship_track_backend.entity.AdminEntity;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.Role;
import com.ship_track_backend.pojo.AdminLoginRequest;
import com.ship_track_backend.pojo.AdminPasswordUpdateRequest;
import com.ship_track_backend.repository.AdminRepository;
import com.ship_track_backend.repository.ShipmentRepository;
import com.ship_track_backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ShipmentService shipmentService;
    @Autowired
    ShipmentRepository shipmentRepository;
    

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
    
    // ================= ADMIN DASHBOARD STATS =================

    public AdminDashboardResponse getDashboardStats() {

        Long totalShipments = shipmentRepository.count();

        Long totalUsers = userRepository.count();


        AdminDashboardResponse dashboardDto = new AdminDashboardResponse();

        dashboardDto.setTotalShipments(totalShipments);

        dashboardDto.setTotalUsers(totalUsers);


        return dashboardDto;
    }
    
    public List<ShipmentResponseDto> getDashboardShipments() {

        List<ShipmentEntity> shipments = shipmentRepository.findAll();

        List<ShipmentResponseDto> responseList = new ArrayList<>();

        for (ShipmentEntity shipment : shipments) {

            ShipmentResponseDto responseDto =
                    new ShipmentResponseDto();

            responseDto.setId(
                    shipment.getId()
            );

            responseDto.setTrackingNumber(
                    shipment.getTrackingNumber()
            );

            // Sender
            responseDto.setSenderName(
                    shipment.getSender().getName()
            );

            // Receiver
            responseDto.setReceiverName(
                    shipment.getReceiverName()
            );

            responseDto.setReceiverPhone(
                    shipment.getReceiverPhone()
            );

            // Pickup Location
            responseDto.setPickupAddress(
                    shipment.getPickupAddress()
            );

            responseDto.setPickupCity(
                    shipment.getPickupCity()
            );

            responseDto.setPickupState(
                    shipment.getPickupState()
            );

            responseDto.setPickupPincode(
                    shipment.getPickupPincode()
            );

            // Delivery Location
            responseDto.setDeliveryAddress(
                    shipment.getDeliveryAddress()
            );

            responseDto.setDeliveryCity(
                    shipment.getDeliveryCity()
            );

            responseDto.setDeliveryState(
                    shipment.getDeliveryState()
            );

            responseDto.setDeliveryPincode(
                    shipment.getDeliveryPincode()
            );

            // Package
            responseDto.setPackageDescription(
                    shipment.getPackageDescription()
            );

            responseDto.setWeight(
                    shipment.getWeight()
            );

            // Status
            responseDto.setStatus(
                    shipment.getStatus()
            );

            // Assigned Operator
            if (shipment.getAssignedOperator() != null) {

                responseDto.setAssignedOperatorName(
                        shipment.getAssignedOperator().getName()
                );
            }

            // Dates
            responseDto.setCreatedAt(
                    shipment.getCreatedAt()
            );

            responseDto.setUpdatedAt(
                    shipment.getUpdatedAt()
            );

            responseList.add(
                    responseDto
            );
        }

        return responseList;
    }
    
    public void deleteShipment(Long shipmentId) {

		ShipmentEntity shipment = shipmentRepository.findById(shipmentId)
				.orElseThrow(() ->
						new ResponseStatusException(
								HttpStatus.NOT_FOUND,
								"Shipment not found"
						)
				);

		shipmentRepository.delete(shipment);
	}
    
    public void deleteUser(Long id) {

        UserEntity user = userRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        userRepository.delete(user);
    }
    
    public List<UserEntity> getUsers() {

        return userRepository.findAll();
    }
    
    public void updateAdminPassword(AdminPasswordUpdateRequest adminPasswordUpdateRequest, String email) {

		AdminEntity admin = adminRepository
				.findByEmail(email)
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						"Admin not found"
				));

		if (!admin.getPassword().equals(adminPasswordUpdateRequest.getCurrentPassword())) {
			throw new ResponseStatusException(
					HttpStatus.BAD_REQUEST,
					"Old password is incorrect"
			);
		}

		admin.setPassword(adminPasswordUpdateRequest.getNewPassword());
		adminRepository.save(admin);
	}
    
 // ================= ASSIGN LOGISTICS OPERATOR =================

    public void assignOperator(Long shipmentId) {

        // Find shipment
        ShipmentEntity shipment = shipmentRepository
                .findById(shipmentId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Shipment not found"
                        )
                );

        // Find a Logistics Operator
        UserEntity operator = userRepository
                .findByRole(Role.LOGISTICS_OPERATOR)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "No logistics operator found"
                        )
                );

        // Assign operator
        shipment.setAssignedOperator(operator);

        // Update timestamp
        shipment.setUpdatedAt(LocalDateTime.now());

        // Save shipment
        shipmentRepository.save(shipment);
    }

		
}