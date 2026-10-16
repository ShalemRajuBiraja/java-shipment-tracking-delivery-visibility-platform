package com.ship_track_backend.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ship_track_backend.service.SignatureFileService;

/**
 * Implementation of SignatureFileService that handles signature file operations
 * including base64 to PNG conversion, file storage, validation, and retrieval.
 */
@Service
public class SignatureFileServiceImpl implements SignatureFileService {

    private static final Logger logger = LoggerFactory.getLogger(SignatureFileServiceImpl.class);
    
    private static final String SIGNATURE_DIRECTORY = "uploads/signatures";
    private static final String PNG_EXTENSION = ".png";
    private static final int MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
    private static final DateTimeFormatter TIMESTAMP_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
    
    @Value("${app.file.upload.dir:./uploads}")
    private String uploadDir;

    @Override
    public String saveSignatureFile(String base64Data, String trackingNumber) {
        logger.info("Saving signature file for tracking number: {}", trackingNumber);
        
        // Validate inputs
        if (!StringUtils.hasText(base64Data)) {
            throw new IllegalArgumentException("Base64 signature data cannot be null or empty");
        }
        
        if (!StringUtils.hasText(trackingNumber)) {
            throw new IllegalArgumentException("Tracking number cannot be null or empty");
        }
        
        // Validate signature data format and size
        if (!validateSignatureData(base64Data)) {
            throw new IllegalArgumentException("Invalid signature data format");
        }
        
        try {
            // Remove data:image/png;base64, prefix if present
            String cleanBase64 = cleanBase64Data(base64Data);
            
            // Decode base64 to bytes
            byte[] imageBytes = Base64.getDecoder().decode(cleanBase64);
            
            // Check file size limit
            if (imageBytes.length > MAX_FILE_SIZE_BYTES) {
                throw new IllegalArgumentException("Signature file size exceeds maximum limit of 5MB");
            }
            
            // Generate unique filename with timestamp
            String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMAT);
            String fileName = trackingNumber + "_" + timestamp + PNG_EXTENSION;
            
            // Create directory path
            Path directoryPath = Paths.get(uploadDir, SIGNATURE_DIRECTORY);
            Files.createDirectories(directoryPath);
            
            // Create full file path
            Path filePath = directoryPath.resolve(fileName);
            
            // Write file to disk
            Files.write(filePath, imageBytes);
            
            // Return relative path for database storage
            String relativePath = SIGNATURE_DIRECTORY + "/" + fileName;
            
            logger.info("Successfully saved signature file: {}", relativePath);
            return relativePath;
            
        } catch (IOException e) {
            logger.error("Failed to save signature file for tracking number: {}", trackingNumber, e);
            throw new RuntimeException("Failed to save signature file: " + e.getMessage(), e);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid base64 data for tracking number: {}", trackingNumber, e);
            throw e;
        }
    }

    @Override
    public boolean validateSignatureData(String base64Data) {
        if (!StringUtils.hasText(base64Data)) {
            return false;
        }
        
        try {
            // Remove data URL prefix if present
            String cleanBase64 = cleanBase64Data(base64Data);
            
            // Check if string is valid base64
            byte[] imageBytes = Base64.getDecoder().decode(cleanBase64);
            
            // Check if decoded bytes represent a valid image
            ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
            return ImageIO.read(inputStream) != null;
            
        } catch (Exception e) {
            logger.debug("Invalid signature data format: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public Resource getSignatureFile(String filePath) {
        if (!StringUtils.hasText(filePath)) {
            throw new IllegalArgumentException("File path cannot be null or empty");
        }
        
        try {
            // Construct full path
            Path fullPath = Paths.get(uploadDir, filePath);
            
            // Check if file exists
            if (!Files.exists(fullPath)) {
                throw new RuntimeException("Signature file does not exist: " + filePath);
            }
            
            // Check if it's a regular file and readable
            if (!Files.isRegularFile(fullPath) || !Files.isReadable(fullPath)) {
                throw new RuntimeException("Signature file is not accessible: " + filePath);
            }
            
            return new FileSystemResource(fullPath);
            
        } catch (Exception e) {
            logger.error("Failed to retrieve signature file: {}", filePath, e);
            throw new RuntimeException("Failed to retrieve signature file: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteSignatureFile(String filePath) {
        if (!StringUtils.hasText(filePath)) {
            throw new IllegalArgumentException("File path cannot be null or empty");
        }
        
        try {
            // Construct full path
            Path fullPath = Paths.get(uploadDir, filePath);
            
            // Delete file if it exists
            if (Files.exists(fullPath)) {
                Files.delete(fullPath);
                logger.info("Successfully deleted signature file: {}", filePath);
            } else {
                logger.warn("Attempted to delete non-existent signature file: {}", filePath);
            }
            
        } catch (IOException e) {
            logger.error("Failed to delete signature file: {}", filePath, e);
            throw new RuntimeException("Failed to delete signature file: " + e.getMessage(), e);
        }
    }
    
    /**
     * Removes data URL prefix from base64 data if present.
     * Handles formats like "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
     * 
     * @param base64Data The potentially prefixed base64 data
     * @return Clean base64 string without data URL prefix
     */
    private String cleanBase64Data(String base64Data) {
        if (base64Data.contains(",")) {
            // Remove everything before the comma (data URL prefix)
            return base64Data.substring(base64Data.indexOf(",") + 1);
        }
        return base64Data;
    }
}