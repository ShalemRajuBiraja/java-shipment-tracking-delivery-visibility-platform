package com.ship_track_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupportStatsResponse {

    private long totalRequests;

    private long openRequests;

    private long inProgressRequests;

    private long resolvedRequests;

}