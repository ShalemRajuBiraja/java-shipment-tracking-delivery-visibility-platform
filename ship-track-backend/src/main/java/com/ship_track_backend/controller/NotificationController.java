package com.ship_track_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ship_track_backend.dto.NotificationResponseDto;
import com.ship_track_backend.payload.ApiResponse;
import com.ship_track_backend.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }

    // Get all notifications of logged-in user
    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponseDto>>> getMyNotifications() {

        List<NotificationResponseDto> notifications =
                notificationService.getMyNotifications();

        ApiResponse<List<NotificationResponseDto>> response =
                new ApiResponse<>(
                        true,
                        "Notifications retrieved successfully",
                        notifications
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    // Get unread notifications of logged-in user
    @GetMapping("/unread")
    public ResponseEntity<com.ship_track_backend.payload.ApiResponse<List<NotificationResponseDto>>> getUnreadNotifications() {

        List<NotificationResponseDto> notifications =
                notificationService.getUnreadNotifications();

        ApiResponse<List<NotificationResponseDto>> response =
                new ApiResponse<>(
                        true,
                        "Unread notifications retrieved successfully",
                        notifications
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
    
    @PutMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<String>> markAsRead(
            @PathVariable Long notificationId) {

        notificationService.markAsRead(notificationId);

        ApiResponse<String> response =
                new ApiResponse<>(
                        true,
                        "Notification marked as read",
                        null
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}