package com.ship_track_backend.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.service.DemoDataSeedService;

/**
 * Local dev-only helper (active with spring profile dev-h2).
 */
@RestController
@Profile("dev-h2")
@RequestMapping("/api/dev")
public class DemoDevController {

    private final DemoDataSeedService demoDataSeedService;

    public DemoDevController(DemoDataSeedService demoDataSeedService) {
        this.demoDataSeedService = demoDataSeedService;
    }

    @PostMapping("/seed-demo-data")
    public ResponseEntity<ApiResponse<String>> seedDemoData() {
        int created = demoDataSeedService.seedMissingDemoData();

        ApiResponse<String> response = new ApiResponse<>(
                true,
                "Demo data refreshed. New shipments added: " + created
                        + ". Use tracking numbers DEMO-SIGN-POD-001, DEMO-SIGN-POD-002, DEMO-TRACK-003.",
                null
        );

        return ResponseEntity.ok(response);
    }
}
