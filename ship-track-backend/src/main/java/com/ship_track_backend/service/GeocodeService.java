package com.ship_track_backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GeocodeService {

    private final RestClient restClient;

    @Value("${google.maps.api-key}")
    private String apiKey;


    public GeocodeService() {

        this.restClient = RestClient.builder()
                .baseUrl("https://maps.googleapis.com")
                .build();
    }


    // =========================================================
    // GEOCODE ADDRESS
    // =========================================================

    @SuppressWarnings("unchecked")
	public GeoCodeResult geocode(String address) {

        try {

            String uri = UriComponentsBuilder
                    .fromPath("/maps/api/geocode/json")
                    .queryParam("address", address)
                    .queryParam("region", "in")
                    .queryParam("key", apiKey)
                    .build()
                    .encode()
                    .toUriString();


            Map<String, Object> response = restClient
                    .get()
                    .uri(uri)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(Map.class);


            if (response == null) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Empty response from Google Geocoding API"
                );
            }


            String status = String.valueOf(
                    response.get("status")
            );


            if (!"OK".equals(status)) {

            	 String errorMessage =
            	            response.get("error_message") != null
            	                    ? response.get("error_message").toString()
            	                    : "No additional error message from Google";
            	 
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Google Geocoding failed. Status: " + status   + ". "
                                + errorMessage
                );
            }


            List<Map<String, Object>> results =
                    (List<Map<String, Object>>) response.get("results");


            if (results == null || results.isEmpty()) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Google could not find location for address: "
                                + address
                );
            }


            Map<String, Object> firstResult =
                    results.get(0);


            Map<String, Object> geometry =
                    (Map<String, Object>) firstResult.get("geometry");


            Map<String, Object> location =
                    (Map<String, Object>) geometry.get("location");


            Double latitude =
                    Double.parseDouble(
                            location.get("lat").toString()
                    );


            Double longitude =
                    Double.parseDouble(
                            location.get("lng").toString()
                    );


            return new GeoCodeResult(
                    latitude,
                    longitude
            );

        } catch (ResponseStatusException e) {

            throw e;

        } catch (Exception e) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Google Geocoding API request failed",
                    e
            );
        }
    }


    // =========================================================
    // GEO CODE RESULT
    // =========================================================

    public static class GeoCodeResult {

        private final Double latitude;
        private final Double longitude;


        public GeoCodeResult(
                Double latitude,
                Double longitude) {

            this.latitude = latitude;
            this.longitude = longitude;
        }


        public Double getLatitude() {

            return latitude;
        }


        public Double getLongitude() {

            return longitude;
        }
    }
}