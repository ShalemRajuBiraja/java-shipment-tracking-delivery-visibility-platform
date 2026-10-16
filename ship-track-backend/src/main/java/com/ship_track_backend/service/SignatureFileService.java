package com.ship_track_backend.service;

import org.springframework.core.io.Resource;

/**
 * Service interface for handling signature file operations including storage,
 * validation, and retrieval of digital signature files.
 * 
 * This service handles base64 to PNG conversion and file storage logic
 * for digital signatures captured during delivery confirmation process.
 */
public interface SignatureFileService {
    
    /**
     * Saves a base64-encoded signature as a PNG file to the file system.
     * Generates a unique filename using tracking number and timestamp.
     * 
     * @param base64Data The base64-encoded PNG signature data
     * @param trackingNumber The shipment tracking number for filename generation
     * @return The file path where the signature was saved
     * @throws IllegalArgumentException if base64Data is invalid or trackingNumber is blank
     * @throws RuntimeException if file storage fails
     */
    String saveSignatureFile(String base64Data, String trackingNumber);
    
    /**
     * Validates that the provided base64 data represents a valid PNG image.
     * Checks format integrity and ensures the data is not corrupted.
     * 
     * @param base64Data The base64-encoded signature data to validate
     * @return true if the data is valid PNG signature data, false otherwise
     */
    boolean validateSignatureData(String base64Data);
    
    /**
     * Retrieves a signature file as a Resource for serving to clients.
     * Used for accessing stored signature files for display or download.
     * 
     * @param filePath The path to the signature file
     * @return Resource representing the signature file
     * @throws RuntimeException if file does not exist or is not accessible
     */
    Resource getSignatureFile(String filePath);
    
    /**
     * Deletes a signature file from the file system.
     * Used for cleanup operations and removing old signature files.
     * 
     * @param filePath The path to the signature file to delete
     * @throws RuntimeException if file cannot be deleted
     */
    void deleteSignatureFile(String filePath);
}