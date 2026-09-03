package com.ship_track_backend.pojo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Valid
@Getter
@Setter
public class UserRegisterData {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name min 2 characters")
    private String name;


    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must be exactly 10 digits"
    )
    private String phoneNumber;


    @NotBlank(message = "Email is required")
    @Pattern(
        regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        message = "Enter a valid email address"
    )
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;


    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be at least 8 characters")
    private String password;


    @NotBlank(message = "Role is required")
    @Pattern(
        regexp = "CUSTOMER|BUSINESS_CLIENT|LOGISTICS_OPERATOR|SUPPORT_AGENT",
        message = "Invalid role"
    )
    private String role;


    // Business Client
    private String companyName;

    private String gstId;


    // Logistics Operator
    private String logisticsCompanyName;

    private String transportLicenseNumber;


    // Support Agent
    private String employeeId;
}