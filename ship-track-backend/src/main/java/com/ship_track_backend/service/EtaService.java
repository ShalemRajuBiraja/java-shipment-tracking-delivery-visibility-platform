package com.ship_track_backend.service;

import org.springframework.stereotype.Service;

@Service
public class EtaService {

    public double calculateEta(double distanceKm, double speedKmph) {

        if (distanceKm <= 0) {
            throw new IllegalArgumentException(
                    "Distance must be greater than 0"
            );
        }

        if (speedKmph <= 0) {
            throw new IllegalArgumentException(
                    "Speed must be greater than 0"
            );
        }

        return distanceKm / speedKmph;
    }
}