package com.ship_track_backend.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {

    private String currentPassword;

    private String newPassword;

}