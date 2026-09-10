package com.ship_track_backend.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminPasswordUpdateRequest {
	 private String currentPassword;

	    private String newPassword;
}

   

