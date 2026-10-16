package com.ship_track_backend.config;

import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for file upload settings.
 * Defines upload directory paths and file size limits.
 */
@Configuration
public class FileUploadConfig {
    
    public static final String DEFAULT_UPLOAD_DIR = "./uploads";
    public static final int MAX_SIGNATURE_SIZE_MB = 5;
    public static final String SIGNATURE_DIRECTORY = "signatures";
    public static final String POD_DIRECTORY = "pod-documents";
}