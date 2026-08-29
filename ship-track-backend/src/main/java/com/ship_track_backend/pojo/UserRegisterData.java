package com.ship_track_backend.pojo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
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

    @NotBlank(message = "Email is required")
    @Pattern(
    	    regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    	    message = "Enter a valid email address"
    	)    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be 8 letters")
    private String password;

    @NotBlank(message = "Role is required")
    @Pattern(
        regexp = "CUSTOMER|BUSINESS_CLIENT|LOGISTICS_OPERATOR|SUPPORT_AGENT|ADMIN",
        message = "Invalid role"
    )
    private String role;



   
}