package com.ship_track_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ship_track_backend.entity.NotificationsEntity;

@Repository
public interface NotificationRepository
        extends JpaRepository<NotificationsEntity, Long> {

    List<NotificationsEntity> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<NotificationsEntity> findByUserIdAndIsReadFalseOrderByCreatedAtDesc(Long userId);
}