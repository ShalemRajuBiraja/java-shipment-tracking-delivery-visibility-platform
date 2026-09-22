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

    @Value("${locationiq.api-key}")
    private String locationIqApiKey;

    private static final String LOCATION_IQ_URL =
            "https://us1.locationiq.com/v1/search";

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Double> convertLocationToCoordinates(
            String newLocation) {

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.set(
                "User-Agent",
                "ShipTrackPro/1.0"
        );

        Map<String, String> params = new HashMap<>();

        params.put("key", locationIqApiKey);
        params.put("q", newLocation);
        params.put("format", "json");
        params.put("countrycodes", "in");

        HttpEntity<Void> request =
                new HttpEntity<>(headers);

        ResponseEntity<Object[]> response =
                restTemplate.exchange(
                        LOCATION_IQ_URL
                                + "?key={key}"
                                + "&q={q}"
                                + "&format={format}"
                                + "&countrycodes={countrycodes}",
                        HttpMethod.GET,
                        request,
                        Object[].class,
                        params
                );

        Object[] results = response.getBody();

        if (results == null || results.length == 0) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Unable to find location: " + newLocation
            );
        }

        Map<?, ?> firstResult =
                (Map<?, ?>) results[0];

        Double latitude =
                Double.parseDouble(
                        firstResult.get("lat").toString()
                );

        Double longitude =
                Double.parseDouble(
                        firstResult.get("lon").toString()
                );

        Map<String, Double> coordinates =
                new HashMap<>();

        coordinates.put("latitude", latitude);
        coordinates.put("longitude", longitude);

        return coordinates;
    }
}