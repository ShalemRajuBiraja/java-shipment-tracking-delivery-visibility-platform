package com.ship_track_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.service.EtaService;

@RestController
public class EtaController {

    @Autowired
    private EtaService etaService;

    @GetMapping("/api/eta/calculate")
    public ResponseEntity<?> calculateEta(
            @RequestParam double distanceKm,
            @RequestParam double speedKmph) {

        double etaHours =
                etaService.calculateEta(distanceKm, speedKmph);

        return ResponseEntity.ok(
                java.util.Map.of(
                        "success", true,
                        "etaHours", etaHours
                )
        );
    }
}