package com.ship_track_backend.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.pojo.PODGenerationRequest;
import com.ship_track_backend.service.PODGenerationService;

@Service
public class PODGenerationServiceImpl implements PODGenerationService {

    private static final Logger logger = LoggerFactory.getLogger(PODGenerationServiceImpl.class);

    private static final String POD_DIRECTORY = "uploads/pod-documents";
    private static final DateTimeFormatter TIMESTAMP_FORMAT =
            DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

    @Value("${app.file.upload.dir:./uploads}")
    private String uploadDir;

    @Override
    public String generatePODDocument(PODGenerationRequest request) {
        if (request == null || request.getShipment() == null) {
            throw new IllegalArgumentException("Shipment data is required for POD generation");
        }

        ShipmentEntity shipment = request.getShipment();
        String trackingNumber = shipment.getTrackingNumber();

        try {
            String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMAT);
            String fileName = trackingNumber + "_pod_" + timestamp + ".pdf";

            Path directoryPath = Paths.get(uploadDir, POD_DIRECTORY);
            Files.createDirectories(directoryPath);

            Path filePath = directoryPath.resolve(fileName);

            try (PdfWriter writer = new PdfWriter(filePath.toFile());
                    PdfDocument pdfDocument = new PdfDocument(writer);
                    Document document = new Document(pdfDocument)) {

                document.add(new Paragraph("Proof of Delivery"));
                document.add(new Paragraph("Tracking Number: " + trackingNumber));
                document.add(new Paragraph("Receiver: " + shipment.getReceiverName()));
                document.add(new Paragraph("Receiver Phone: " + shipment.getReceiverPhone()));
                document.add(new Paragraph("Delivery Address: " + shipment.getDeliveryAddress()));

                if (request.getConfirmation() != null) {
                    document.add(new Paragraph(
                            "Confirmed By: " + request.getConfirmation().getConfirmedByName()));
                    document.add(new Paragraph(
                            "Delivered At: " + request.getConfirmation().getConfirmedAt()));
                }

                if (StringUtils.hasText(shipment.getPackageDescription())) {
                    document.add(new Paragraph(
                            "Package: " + shipment.getPackageDescription()));
                }

                if (StringUtils.hasText(request.getSignaturePath())) {
                    Path signatureFullPath =
                            Paths.get(uploadDir, request.getSignaturePath());
                    if (Files.exists(signatureFullPath)) {
                        Image signatureImage = new Image(
                                ImageDataFactory.create(signatureFullPath.toAbsolutePath().toString()));
                        signatureImage.setWidth(200);
                        document.add(new Paragraph("Recipient Signature:"));
                        document.add(signatureImage);
                    }
                }
            }

            String relativePath = POD_DIRECTORY + "/" + fileName;
            logger.info("Generated POD document: {}", relativePath);
            return relativePath;

        } catch (IOException e) {
            logger.error("Failed to generate POD for tracking number: {}", trackingNumber, e);
            throw new RuntimeException("Failed to generate POD document: " + e.getMessage(), e);
        }
    }

    @Override
    public Resource getPODDocument(String filePath) {
        if (!StringUtils.hasText(filePath)) {
            throw new IllegalArgumentException("POD file path cannot be null or empty");
        }

        Path fullPath = Paths.get(uploadDir, filePath);
        if (!Files.exists(fullPath) || !Files.isReadable(fullPath)) {
            throw new RuntimeException("POD document does not exist: " + filePath);
        }

        return new FileSystemResource(fullPath);
    }
}
