package com.ship_track_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.ship_track_backend.enums.Role;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Role role;
    
 // Common field for all users
    @Column(name = "phone_number", nullable = false, length = 15)
    private String phoneNumber;


    // Business Client fields
    @Column(name = "company_name", length = 150)
    private String companyName;

    @Column(name = "gst_id", length = 30)
    private String gstId;


    // Logistics Operator fields
    @Column(name = "logistics_company_name", length = 150)
    private String logisticsCompanyName;

    @Column(name = "transport_license_number", length = 100)
    private String transportLicenseNumber;


    // Support Agent field
    @Column(name = "employee_id", length = 100)
    private String employeeId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}