package com.ship_track_backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class NewLocationService {

    private final GeocodeService geocodeService;

    public NewLocationService(GeocodeService geocodeService) {
        this.geocodeService = geocodeService;
    }

    @Value("${locationiq.api-key}")
    private String locationIqApiKey;

    private static final String LOCATION_IQ_URL =
            "https://us1.locationiq.com/v1/search";

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Double> convertLocationToCoordinates(
        String newLocation) {

   GeocodeService.GeoCodeResult result =
        geocodeService.geocode(newLocation);

Map<String, Double> coordinates = new HashMap<>();
coordinates.put("latitude", result.getLatitude());
coordinates.put("longitude", result.getLongitude());

return coordinates;
        }
}