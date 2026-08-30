package com.ship_track_backend.pojo;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminLoginRequest {

	@NotBlank(message = "Email is required")
    @Pattern(
    	    regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    	    message = "Please enter a valid email address"
    	)
    	private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be 8 letters")
    private String password;

    @NotBlank(message = "Favorite teacher name is required")
    private String favoriteTeacher;
}