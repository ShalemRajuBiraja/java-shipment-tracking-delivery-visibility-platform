package com.ship_track_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ship_track_backend.dto.NotificationResponseDto;
import com.ship_track_backend.entity.NotificationsEntity;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.repository.NotificationRepository;
import com.ship_track_backend.repository.UserRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(
            NotificationRepository notificationRepository,
            UserRepository userRepository) {

        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    // Create a new notification
    public NotificationsEntity createNotification(
            UserEntity user,
            ShipmentEntity shipment,
            String message) {

        NotificationsEntity notification =
                new NotificationsEntity();

        notification.setUser(user);
        notification.setShipment(shipment);
        notification.setMessage(message);
        notification.setIsRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    // Get all notifications of logged-in user
    public List<NotificationResponseDto> getMyNotifications() {

        UserEntity user = getLoggedInUser();

        List<NotificationsEntity> notifications =
                notificationRepository
                        .findByUserIdOrderByCreatedAtDesc(user.getId());

        return notifications.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get unread notifications of logged-in user
    public List<NotificationResponseDto> getUnreadNotifications() {

        UserEntity user = getLoggedInUser();

        List<NotificationsEntity> notifications =
                notificationRepository
                        .findByUserIdAndIsReadFalseOrderByCreatedAtDesc(
                                user.getId());

        return notifications.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get currently logged-in user
    private UserEntity getLoggedInUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    // Convert Entity to DTO
    private NotificationResponseDto convertToDto(
            NotificationsEntity notification) {

        String trackingNumber = null;

        if (notification.getShipment() != null) {

            trackingNumber =
                    notification.getShipment()
                            .getTrackingNumber();
        }

        return new NotificationResponseDto(
                notification.getId(),
                notification.getMessage(),
                notification.getIsRead(),
                notification.getCreatedAt(),
                trackingNumber
        );
    }
    
    public void markAsRead(Long notificationId) {

        UserEntity user = getLoggedInUser();

        NotificationsEntity notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You are not authorized to update this notification"
            );
        }

        notification.setIsRead(true);

        notificationRepository.save(notification);
    }
}