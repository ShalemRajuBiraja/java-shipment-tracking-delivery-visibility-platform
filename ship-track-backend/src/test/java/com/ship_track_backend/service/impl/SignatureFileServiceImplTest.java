package com.ship_track_backend.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.Resource;
import org.springframework.test.util.ReflectionTestUtils;

/**
 * Unit tests for SignatureFileServiceImpl.
 * Tests the core functionality of signature file storage, validation, and retrieval.
 */
@ExtendWith(MockitoExtension.class)
class SignatureFileServiceImplTest {

    @InjectMocks
    private SignatureFileServiceImpl signatureFileService;

    @TempDir
    Path tempDir;

    // Sample base64 PNG data (minimal 1x1 transparent PNG)
    private static final String VALID_BASE64_PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    private static final String INVALID_BASE64 = "invalid-base64-data";
    private static final String TRACKING_NUMBER = "TRK123456789";

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(signatureFileService, "uploadDir", tempDir.toString());
    }

    @Test
    void testSaveSignatureFile_ValidInput_Success() {
        // Test saving a valid signature file
        String filePath = signatureFileService.saveSignatureFile(VALID_BASE64_PNG, TRACKING_NUMBER);
        
        assertNotNull(filePath);
        assertTrue(filePath.startsWith("uploads/signatures/"));
        assertTrue(filePath.contains(TRACKING_NUMBER));
        assertTrue(filePath.endsWith(".png"));
        
        // Verify file exists on disk
        Path fullPath = Paths.get(tempDir.toString(), filePath);
        assertTrue(Files.exists(fullPath));
    }

    @Test
    void testSaveSignatureFile_WithDataUrlPrefix_Success() {
        // Test with data URL prefix
        String dataUrl = "data:image/png;base64," + VALID_BASE64_PNG;
        
        String filePath = signatureFileService.saveSignatureFile(dataUrl, TRACKING_NUMBER);
        
        assertNotNull(filePath);
        Path fullPath = Paths.get(tempDir.toString(), filePath);
        assertTrue(Files.exists(fullPath));
    }

    @Test
    void testSaveSignatureFile_NullBase64Data_ThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> signatureFileService.saveSignatureFile(null, TRACKING_NUMBER)
        );
        
        assertEquals("Base64 signature data cannot be null or empty", exception.getMessage());
    }

    @Test
    void testSaveSignatureFile_EmptyBase64Data_ThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> signatureFileService.saveSignatureFile("", TRACKING_NUMBER)
        );
        
        assertEquals("Base64 signature data cannot be null or empty", exception.getMessage());
    }

    @Test
    void testSaveSignatureFile_NullTrackingNumber_ThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> signatureFileService.saveSignatureFile(VALID_BASE64_PNG, null)
        );
        
        assertEquals("Tracking number cannot be null or empty", exception.getMessage());
    }

    @Test
    void testSaveSignatureFile_InvalidBase64Data_ThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> signatureFileService.saveSignatureFile(INVALID_BASE64, TRACKING_NUMBER)
        );
        
        assertEquals("Invalid signature data format", exception.getMessage());
    }

    @Test
    void testValidateSignatureData_ValidPNG_ReturnsTrue() {
        assertTrue(signatureFileService.validateSignatureData(VALID_BASE64_PNG));
    }

    @Test
    void testValidateSignatureData_WithDataUrlPrefix_ReturnsTrue() {
        String dataUrl = "data:image/png;base64," + VALID_BASE64_PNG;
        assertTrue(signatureFileService.validateSignatureData(dataUrl));
    }

    @Test
    void testValidateSignatureData_InvalidData_ReturnsFalse() {
        assertFalse(signatureFileService.validateSignatureData(INVALID_BASE64));
    }

    @Test
    void testValidateSignatureData_NullData_ReturnsFalse() {
        assertFalse(signatureFileService.validateSignatureData(null));
    }

    @Test
    void testValidateSignatureData_EmptyData_ReturnsFalse() {
        assertFalse(signatureFileService.validateSignatureData(""));
    }

    @Test
    void testGetSignatureFile_ExistingFile_ReturnsResource() throws IOException {
        // First save a file
        String filePath = signatureFileService.saveSignatureFile(VALID_BASE64_PNG, TRACKING_NUMBER);
        
        // Then retrieve it
        Resource resource = signatureFileService.getSignatureFile(filePath);
        
        assertNotNull(resource);
        assertTrue(resource.exists());
        assertTrue(resource.isReadable());
    }

    @Test
    void testGetSignatureFile_NonExistentFile_ThrowsException() {
        RuntimeException exception = assertThrows(
            RuntimeException.class,
            () -> signatureFileService.getSignatureFile("uploads/signatures/nonexistent.png")
        );
        
        assertTrue(exception.getMessage().contains("Signature file does not exist"));
    }

    @Test
    void testGetSignatureFile_NullPath_ThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> signatureFileService.getSignatureFile(null)
        );
        
        assertEquals("File path cannot be null or empty", exception.getMessage());
    }

    @Test
    void testDeleteSignatureFile_ExistingFile_Success() throws IOException {
        // First save a file
        String filePath = signatureFileService.saveSignatureFile(VALID_BASE64_PNG, TRACKING_NUMBER);
        Path fullPath = Paths.get(tempDir.toString(), filePath);
        
        // Verify file exists
        assertTrue(Files.exists(fullPath));
        
        // Delete it
        assertDoesNotThrow(() -> signatureFileService.deleteSignatureFile(filePath));
        
        // Verify file is deleted
        assertFalse(Files.exists(fullPath));
    }

    @Test
    void testDeleteSignatureFile_NonExistentFile_DoesNotThrow() {
        // Should not throw exception for non-existent file
        assertDoesNotThrow(() -> signatureFileService.deleteSignatureFile("uploads/signatures/nonexistent.png"));
    }

    @Test
    void testDeleteSignatureFile_NullPath_ThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> signatureFileService.deleteSignatureFile(null)
        );
        
        assertEquals("File path cannot be null or empty", exception.getMessage());
    }

    @Test
    void testSaveSignatureFile_FileSizeLimit_Success() {
        // Test with large but valid file
        byte[] largeImageData = new byte[1024 * 1024]; // 1MB
        String largeBase64 = Base64.getEncoder().encodeToString(largeImageData);
        
        // This should throw an exception because it's not valid image data
        assertThrows(IllegalArgumentException.class, () -> 
            signatureFileService.saveSignatureFile(largeBase64, TRACKING_NUMBER)
        );
    }

    @Test
    void testSaveSignatureFile_CreatesDirectory() {
        // Test that directory is created if it doesn't exist
        String filePath = signatureFileService.saveSignatureFile(VALID_BASE64_PNG, TRACKING_NUMBER);
        
        Path directoryPath = Paths.get(tempDir.toString(), "uploads/signatures");
        assertTrue(Files.exists(directoryPath));
        assertTrue(Files.isDirectory(directoryPath));
    }
}