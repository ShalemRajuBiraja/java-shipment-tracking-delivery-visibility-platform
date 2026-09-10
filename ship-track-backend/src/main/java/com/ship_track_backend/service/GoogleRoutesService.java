package com.ship_track_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleRoutesService {

    @Value("${google.maps.api-key}")
    private String googleApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String ROUTES_API_URL =
            "https://routes.googleapis.com/directions/v2:computeRoutes";


    // ================= CALCULATE ROUTE =================

    public Map<String, Object> calculateRoute(
            String origin,
            String destination) {

        // ================= REQUEST HEADERS =================

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.set(
                "X-Goog-Api-Key",
                googleApiKey
        );

        headers.set(
                "X-Goog-FieldMask",
                "routes.duration,"
                + "routes.distanceMeters,"
                + "routes.polyline.encodedPolyline"
        );


        // ================= REQUEST BODY =================

        Map<String, Object> requestBody =
                new HashMap<>();

        requestBody.put(
                "origin",
                Map.of(
                        "address",
                        origin
                )
        );

        requestBody.put(
                "destination",
                Map.of(
                        "address",
                        destination
                )
        );

        requestBody.put(
                "travelMode",
                "DRIVE"
        );


        // ================= HTTP REQUEST =================

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(
                        requestBody,
                        headers
                );


        // ================= CALL GOOGLE ROUTES API =================

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        ROUTES_API_URL,
                        HttpMethod.POST,
                        request,
                        Map.class
                );


        // ================= RETURN RESPONSE =================

        return response.getBody();
    }
    
 // ================= CALCULATE ETA FROM CURRENT LOCATION =================

    public Map<String, Object> calculateEta(
            Double latitude,
            Double longitude,
            String destination) {

        // ================= REQUEST HEADERS =================

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.set(
                "X-Goog-Api-Key",
                googleApiKey
        );

        headers.set(
                "X-Goog-FieldMask",
                "routes.duration,"
                + "routes.distanceMeters"
        );


        // ================= CURRENT LOCATION =================

        Map<String, Object> originLocation =
                Map.of(
                        "location",
                        Map.of(
                                "latLng",
                                Map.of(
                                        "latitude",
                                        latitude,
                                        "longitude",
                                        longitude
                                )
                        )
                );


        // ================= REQUEST BODY =================

        Map<String, Object> requestBody =
                new HashMap<>();

        requestBody.put(
                "origin",
                originLocation
        );

        requestBody.put(
                "destination",
                Map.of(
                        "address",
                        destination
                )
        );

        requestBody.put(
                "travelMode",
                "DRIVE"
        );


        // ================= HTTP REQUEST =================

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(
                        requestBody,
                        headers
                );


        // ================= CALL GOOGLE ROUTES API =================

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        ROUTES_API_URL,
                        HttpMethod.POST,
                        request,
                        Map.class
                );


        // ================= RETURN RESPONSE =================

        return response.getBody();
    }
    
    public Map<String, Object> calculateRouteThroughLocations(
            List<Map<String, Double>> locations) {

        if (locations == null || locations.size() < 2) {
            throw new IllegalArgumentException(
                    "At least two locations are required"
            );
        }

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.set(
                "X-Goog-Api-Key",
                googleApiKey
        );

        headers.set(
                "X-Goog-FieldMask",
                "routes.duration,"
                        + "routes.distanceMeters,"
                        + "routes.polyline.encodedPolyline"
        );

        Map<String, Object> firstLocation =
                Map.of(
                        "latitude",
                        locations.get(0).get("latitude"),
                        "longitude",
                        locations.get(0).get("longitude")
                );

        Map<String, Object> lastLocation =
                Map.of(
                        "latitude",
                        locations.get(locations.size() - 1)
                                .get("latitude"),
                        "longitude",
                        locations.get(locations.size() - 1)
                                .get("longitude")
                );

        Map<String, Object> origin =
                Map.of(
                        "location",
                        Map.of(
                                "latLng",
                                firstLocation
                        )
                );

        Map<String, Object> destination =
                Map.of(
                        "location",
                        Map.of(
                                "latLng",
                                lastLocation
                        )
                );

        List<Map<String, Object>> intermediates =
                locations.subList(
                        1,
                        locations.size() - 1
                )
                .stream()
                .map(location -> {

                    Map<String, Object> latLng =
                            Map.of(
                                    "latitude",
                                    location.get("latitude"),
                                    "longitude",
                                    location.get("longitude")
                            );

                    return Map.of(
                            "via",
                            true,
                            "location",
                            Map.of(
                                    "latLng",
                                    latLng
                            )
                    );
                })
                .toList();

        Map<String, Object> requestBody =
                new HashMap<>();

        requestBody.put(
                "origin",
                origin
        );

        requestBody.put(
                "destination",
                destination
        );

        requestBody.put(
                "intermediates",
                intermediates
        );

        requestBody.put(
                "travelMode",
                "DRIVE"
        );

        requestBody.put(
                "polylineQuality",
                "HIGH_QUALITY"
        );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(
                        requestBody,
                        headers
                );

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        ROUTES_API_URL,
                        HttpMethod.POST,
                        request,
                        Map.class
                );

        return response.getBody();
    }

}