package com.ship_track_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SupportRequestDto {

    private Long id;

    private String name;

    private String phoneNumber;

    private String issue;

    private String description;

    private String status;

    private LocalDateTime createdAt;
}