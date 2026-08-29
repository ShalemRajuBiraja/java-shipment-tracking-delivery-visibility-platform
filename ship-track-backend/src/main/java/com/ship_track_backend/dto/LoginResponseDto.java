package com.ship_track_backend.dto;


import com.ship_track_backend.entity.UserEntity;

import lombok.Data;

@Data
public class LoginResponseDto {
	
	public UserEntity userData;
	public String token;
}
