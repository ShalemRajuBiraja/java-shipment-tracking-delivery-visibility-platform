package com.ship_track_backend.service;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GeocodeService {

    private final RestTemplate restTemplate;

    @Value("${locationiq.api-key}")
    private String apiKey;

    public GeocodeService() {
        this.restTemplate = new RestTemplate();
    }

    // =========================================================
    // MAIN GEOCODING METHOD
    // =========================================================

    @SuppressWarnings("unchecked")
    public GeoCodeResult geocode(String address) {

        try {

            if (address == null || address.trim().isEmpty()) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Address cannot be empty"
                );
            }

            String cleanAddress = address.trim();

            System.out.println();
            System.out.println("======================================");
            System.out.println("GEOCODING ADDRESS");
            System.out.println(cleanAddress);
            System.out.println("======================================");

            // -------------------------------------------------
            // FIRST: NORMAL FREE-FORM SEARCH
            // -------------------------------------------------

            List<Map<String, Object>> results =
                    searchFreeForm(cleanAddress);

            // -------------------------------------------------
            // CHECK NORMAL RESULT
            // -------------------------------------------------

            if (isGoodResult(results)) {

                Map<String, Object> result =
                        results.get(0);

                return createResult(
                        result,
                        "FREE-FORM SEARCH"
                );
            }

            // -------------------------------------------------
            // NORMAL SEARCH FAILED / BAD RESULT
            // TRY STRUCTURED SEARCH
            // -------------------------------------------------

            System.out.println();
            System.out.println(
                    "Normal LocationIQ result is not reliable."
            );

            System.out.println(
                    "Trying STRUCTURED SEARCH..."
            );

            List<Map<String, Object>> structuredResults =
                    searchStructured(cleanAddress);

            if (structuredResults == null
                    || structuredResults.isEmpty()) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "LocationIQ could not find a reliable location for: "
                                + cleanAddress
                );
            }

            // -------------------------------------------------
            // FIND BEST STRUCTURED RESULT
            // -------------------------------------------------

            Map<String, Object> bestResult =
                    findStructuredMatch(
                            structuredResults,
                            cleanAddress
                    );

            if (bestResult == null) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "LocationIQ returned results, but no reliable location matched: "
                                + cleanAddress
                );
            }

            return createResult(
                    bestResult,
                    "STRUCTURED SEARCH"
            );

        } catch (ResponseStatusException e) {

            throw e;

        } catch (Exception e) {

            e.printStackTrace();

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "LocationIQ Geocoding API request failed: "
                            + e.getMessage(),
                    e
            );
        }
    }

    // =========================================================
    // FREE-FORM SEARCH
    // =========================================================

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> searchFreeForm(
            String address) {

        URI uri = UriComponentsBuilder
                .fromUriString(
                        "https://us1.locationiq.com/v1/search"
                )
                .queryParam("key", apiKey)
                .queryParam("q", address)
                .queryParam("format", "json")
                .queryParam("countrycodes", "in")
                .queryParam("addressdetails", 1)
                .queryParam("normalizeaddress", 1)
                .queryParam("matchquality", 1)
                .build()
                .encode()
                .toUri();

        printRequest(
                "FREE-FORM REQUEST",
                uri
        );

        ResponseEntity<List> response =
                restTemplate.exchange(
                        uri,
                        HttpMethod.GET,
                        createRequestEntity(),
                        List.class
                );

        System.out.println(
                "FREE-FORM STATUS: "
                        + response.getStatusCode()
        );

        System.out.println(
                "FREE-FORM RESPONSE: "
                        + response.getBody()
        );

        return response.getBody();
    }

    // =========================================================
    // STRUCTURED SEARCH
    // =========================================================

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> searchStructured(
            String address) {

        String[] parts =
                address.split(",");

        String city = "";
        String county = "";
        String state = "";
        String postalCode = "";
        String country = "";

        // -----------------------------------------------------
        // Expected format:
        //
        // Mogaltur,
        // West Godavari,
        // Andhra Pradesh,
        // 534280,
        // India
        // -----------------------------------------------------

        if (parts.length >= 5) {

            city = parts[0].trim();

            county = parts[1].trim();

            state = parts[2].trim();

            postalCode = parts[3].trim();

            country = parts[4].trim();

        } else {

            // Not enough address components
            return List.of();
        }

        System.out.println();
        System.out.println(
                "STRUCTURED ADDRESS COMPONENTS"
        );

        System.out.println(
                "City       : " + city
        );

        System.out.println(
                "County     : " + county
        );

        System.out.println(
                "State      : " + state
        );

        System.out.println(
                "Postal Code: " + postalCode
        );

        System.out.println(
                "Country    : " + country
        );

        // -----------------------------------------------------
        // Build structured LocationIQ request
        // -----------------------------------------------------

        UriComponentsBuilder builder =
                UriComponentsBuilder
                        .fromUriString(
                                "https://us1.locationiq.com/v1/search/structured"
                        )
                        .queryParam("key", apiKey)
                        .queryParam("city", city)
                        .queryParam("county", county)
                        .queryParam("state", state)
                        .queryParam("country", country)
                        .queryParam("postalcode", postalCode)
                        .queryParam("countrycodes", "in")
                        .queryParam("format", "json")
                        .queryParam("addressdetails", 1)
                        .queryParam("normalizeaddress", 1)
                        .queryParam("matchquality", 1)
                        .queryParam("limit", 10);

        URI uri =
                builder
                        .build()
                        .encode()
                        .toUri();

        printRequest(
                "STRUCTURED REQUEST",
                uri
        );

        ResponseEntity<List> response =
                restTemplate.exchange(
                        uri,
                        HttpMethod.GET,
                        createRequestEntity(),
                        List.class
                );

        System.out.println(
                "STRUCTURED STATUS: "
                        + response.getStatusCode()
        );

        System.out.println(
                "STRUCTURED RESPONSE: "
                        + response.getBody()
        );

        return response.getBody();
    }

    // =========================================================
    // CHECK IF FREE-FORM RESULT IS RELIABLE
    // =========================================================

    private boolean isGoodResult(
            List<Map<String, Object>> results) {

        if (results == null
                || results.isEmpty()) {

            return false;
        }

        Map<String, Object> result =
                results.get(0);

        String displayName =
                String.valueOf(
                        result.get("display_name")
                );

        Object latitude =
                result.get("lat");

        Object longitude =
                result.get("lon");

        if (latitude == null
                || longitude == null) {

            return false;
        }

        // -----------------------------------------------------
        // Reject country-only result
        // -----------------------------------------------------

        if (displayName.equalsIgnoreCase("India")) {

            System.out.println(
                    "Rejected country-level result: "
                            + displayName
            );

            return false;
        }

        // -----------------------------------------------------
        // Reject extremely generic result
        // -----------------------------------------------------

        Object type =
                result.get("type");

        Object placeClass =
                result.get("class");

        if (type == null
                && placeClass == null) {

            System.out.println(
                    "Rejected generic LocationIQ result."
            );

            return false;
        }

        return true;
    }

    // =========================================================
    // FIND BEST STRUCTURED RESULT
    // =========================================================

    private Map<String, Object> findStructuredMatch(
            List<Map<String, Object>> results,
            String address) {

        String normalizedAddress =
                normalize(address);

        Map<String, Object> bestResult =
                null;

        int bestScore = -1;

        for (Map<String, Object> result : results) {

            String displayName =
                    normalize(
                            String.valueOf(
                                    result.get(
                                            "display_name"
                                    )
                            )
                    );

            int score = 0;

            // -------------------------------------------------
            // Address word matching
            // -------------------------------------------------

            String[] words =
                    normalizedAddress.split("\\s+");

            for (String word : words) {

                if (word.length() < 3) {
                    continue;
                }

                if (displayName.contains(word)) {
                    score++;
                }
            }

            // -------------------------------------------------
            // Give extra importance to Mogaltur / locality
            // -------------------------------------------------

            if (displayName.contains("mogaltur")) {
                score += 10;
            }

            if (displayName.contains(
                    "west godavari")) {

                score += 5;
            }

            if (displayName.contains(
                    "andhra pradesh")) {

                score += 5;
            }

            if (displayName.contains("534280")) {
                score += 5;
            }

            System.out.println();
            System.out.println(
                    "STRUCTURED CANDIDATE:"
            );

            System.out.println(
                    "Display Name: "
                            + result.get(
                                    "display_name"
                            )
            );

            System.out.println(
                    "Latitude: "
                            + result.get("lat")
            );

            System.out.println(
                    "Longitude: "
                            + result.get("lon")
            );

            System.out.println(
                    "MATCH SCORE: "
                            + score
            );

            if (score > bestScore) {

                bestScore = score;

                bestResult = result;
            }
        }

        System.out.println();
        System.out.println(
                "BEST STRUCTURED MATCH SCORE: "
                        + bestScore
        );

        return bestResult;
    }

    // =========================================================
    // CREATE RESULT
    // =========================================================

    private GeoCodeResult createResult(
            Map<String, Object> result,
            String searchType) {

        Object latitudeObject =
                result.get("lat");

        Object longitudeObject =
                result.get("lon");

        if (latitudeObject == null
                || longitudeObject == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "LocationIQ result contains no coordinates."
            );
        }

        Double latitude =
                Double.parseDouble(
                        latitudeObject.toString()
                );

        Double longitude =
                Double.parseDouble(
                        longitudeObject.toString()
                );

        String displayName =
                String.valueOf(
                        result.get("display_name")
                );

        System.out.println();
        System.out.println(
                "======================================"
        );

        System.out.println(
                "LOCATIONIQ FINAL RESULT"
        );

        System.out.println(
                "Search Type: "
                        + searchType
        );

        System.out.println(
                "Display Name: "
                        + displayName
        );

        System.out.println(
                "Latitude: "
                        + latitude
        );

        System.out.println(
                "Longitude: "
                        + longitude
        );

        System.out.println(
                "======================================"
        );

        return new GeoCodeResult(
                latitude,
                longitude
        );
    }

    // =========================================================
    // HTTP HEADERS
    // =========================================================

    private HttpEntity<Void> createRequestEntity() {

        HttpHeaders headers =
                new HttpHeaders();

        headers.setAccept(
                List.of(
                        MediaType.APPLICATION_JSON
                )
        );

        headers.set(
                "User-Agent",
                "ShipTrackPro/1.0"
        );

        return new HttpEntity<>(headers);
    }

    // =========================================================
    // SAFE REQUEST LOG
    // =========================================================

    private void printRequest(
            String title,
            URI uri) {

        System.out.println();
        System.out.println(
                title + ": "
                        + uri.toString()
                        .replace(
                                apiKey,
                                "HIDDEN"
                        )
        );
    }

    // =========================================================
    // NORMALIZE
    // =========================================================

    private String normalize(
            String value) {

        return value
                .toLowerCase()
                .replaceAll(
                        "[^a-z0-9]+",
                        " "
                )
                .trim();
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