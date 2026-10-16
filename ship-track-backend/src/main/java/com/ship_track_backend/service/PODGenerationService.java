package com.ship_track_backend.service;

import org.springframework.core.io.Resource;

import com.ship_track_backend.pojo.PODGenerationRequest;

public interface PODGenerationService {

    String generatePODDocument(PODGenerationRequest request);

    Resource getPODDocument(String filePath);
}
