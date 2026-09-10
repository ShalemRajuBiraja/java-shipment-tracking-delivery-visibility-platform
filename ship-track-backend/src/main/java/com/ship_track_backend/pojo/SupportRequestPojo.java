package com.ship_track_backend.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupportRequestPojo {

    private String name;

    private String phoneNumber;

    private String issue;

    private String description;
}