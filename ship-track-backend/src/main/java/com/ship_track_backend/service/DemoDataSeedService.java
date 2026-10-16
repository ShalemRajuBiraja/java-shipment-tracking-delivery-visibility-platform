package com.ship_track_backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ship_track_backend.entity.DeliveryConfirmationEntity;
import com.ship_track_backend.entity.ShipmentEntity;
import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.enums.Role;
import com.ship_track_backend.enums.ShipmentStatus;
import com.ship_track_backend.repository.DeliveryConfirmationRepository;
import com.ship_track_backend.repository.ShipmentRepository;
import com.ship_track_backend.repository.UserRepository;

@Service
public class DemoDataSeedService {

    public static final String DEMO_PASSWORD = "Demo@123";
    public static final String CUSTOMER_EMAIL = "milestone3.customer@test.com";
    public static final String OPERATOR_EMAIL = "milestone3.operator@test.com";
    public static final String BUSINESS_EMAIL = "milestone3.business@test.com";
    public static final String DEMO_TRACKING_NUMBER = "DEMO-SIGN-POD-001";
    public static final String DEMO_TRACKING_NUMBER_2 = "DEMO-SIGN-POD-002";
    public static final String DEMO_IN_TRANSIT = "DEMO-TRACK-003";

    private final UserRepository userRepository;
    private final ShipmentRepository shipmentRepository;
    private final DeliveryConfirmationRepository deliveryConfirmationRepository;
    private final PasswordEncoder passwordEncoder;

    public DemoDataSeedService(
            UserRepository userRepository,
            ShipmentRepository shipmentRepository,
            DeliveryConfirmationRepository deliveryConfirmationRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.shipmentRepository = shipmentRepository;
        this.deliveryConfirmationRepository = deliveryConfirmationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /** Creates missing demo users and shipments. Returns count of new shipments added. */
    public int seedMissingDemoData() {
        DemoUsers users = ensureDemoUsers();
        int created = 0;

        created += ensureOutForDeliveryShipment(
                users,
                DEMO_TRACKING_NUMBER,
                "Demo package for signature and POD testing (shipment 1)"
        ) ? 1 : 0;

        created += ensureOutForDeliveryShipment(
                users,
                DEMO_TRACKING_NUMBER_2,
                "Demo package for signature and POD testing (shipment 2)"
        ) ? 1 : 0;

        created += ensureTrackableShipment(
                users,
                DEMO_IN_TRANSIT,
                "Demo shipment for tracker / history flow (in transit)"
        ) ? 1 : 0;

        return created;
    }

    private DemoUsers ensureDemoUsers() {
        String encodedPassword = passwordEncoder.encode(DEMO_PASSWORD);

        UserEntity customer = userRepository.findByEmail(CUSTOMER_EMAIL)
                .orElseGet(() -> userRepository.save(UserEntity.builder()
                        .name("Milestone Customer")
                        .email(CUSTOMER_EMAIL)
                        .password(encodedPassword)
                        .role(Role.CUSTOMER)
                        .phoneNumber("9876543210")
                        .build()));

        UserEntity operator = userRepository.findByEmail(OPERATOR_EMAIL)
                .orElseGet(() -> userRepository.save(UserEntity.builder()
                        .name("Milestone Operator")
                        .email(OPERATOR_EMAIL)
                        .password(encodedPassword)
                        .role(Role.LOGISTICS_OPERATOR)
                        .phoneNumber("9876543211")
                        .logisticsCompanyName("Demo Logistics Pvt Ltd")
                        .transportLicenseNumber("DL-TEST-001")
                        .build()));

        UserEntity business = userRepository.findByEmail(BUSINESS_EMAIL)
                .orElseGet(() -> userRepository.save(UserEntity.builder()
                        .name("Milestone Business")
                        .email(BUSINESS_EMAIL)
                        .password(encodedPassword)
                        .role(Role.BUSINESS_CLIENT)
                        .phoneNumber("9876543212")
                        .companyName("Demo Business Co")
                        .gstId("29ABCDE1234F1Z5")
                        .build()));

        return new DemoUsers(customer, operator, business);
    }

    private boolean ensureOutForDeliveryShipment(
            DemoUsers users,
            String trackingNumber,
            String packageDescription) {

        if (shipmentRepository.findByTrackingNumberIgnoreCase(trackingNumber).isPresent()) {
            return false;
        }

        ShipmentEntity shipment = buildBaseShipment(
                users,
                trackingNumber,
                packageDescription,
                ShipmentStatus.OUT_FOR_DELIVERY
        );

        ShipmentEntity savedShipment = shipmentRepository.save(shipment);

        DeliveryConfirmationEntity confirmation = new DeliveryConfirmationEntity();
        confirmation.setShipment(savedShipment);
        confirmation.setCustomer(users.customer());
        confirmation.setOperator(users.operator());
        confirmation.setConfirmed(false);
        confirmation.setRequestedAt(LocalDateTime.now());

        deliveryConfirmationRepository.save(confirmation);
        return true;
    }

    private boolean ensureTrackableShipment(
            DemoUsers users,
            String trackingNumber,
            String packageDescription) {

        if (shipmentRepository.findByTrackingNumberIgnoreCase(trackingNumber).isPresent()) {
            return false;
        }

        shipmentRepository.save(buildBaseShipment(
                users,
                trackingNumber,
                packageDescription,
                ShipmentStatus.IN_TRANSIT
        ));
        return true;
    }

    private ShipmentEntity buildBaseShipment(
            DemoUsers users,
            String trackingNumber,
            String packageDescription,
            ShipmentStatus status) {

        ShipmentEntity shipment = new ShipmentEntity();
        shipment.setTrackingNumber(trackingNumber);
        shipment.setSender(users.business());
        shipment.setReceiver(users.customer());
        shipment.setReceiverName(users.customer().getName());
        shipment.setReceiverPhone(users.customer().getPhoneNumber());
        shipment.setPickupAddress("12 Warehouse Road");
        shipment.setPickupCity("Bengaluru");
        shipment.setPickupState("Karnataka");
        shipment.setPickupPincode("560001");
        shipment.setDeliveryAddress("45 Customer Street");
        shipment.setDeliveryCity("Bengaluru");
        shipment.setDeliveryState("Karnataka");
        shipment.setDeliveryPincode("560038");
        shipment.setPackageDescription(packageDescription);
        shipment.setWeight(new BigDecimal("2.50"));
        shipment.setStatus(status);
        shipment.setAssignedOperator(users.operator());
        shipment.setCreatedAt(LocalDateTime.now());
        shipment.setUpdatedAt(LocalDateTime.now());
        return shipment;
    }

    private record DemoUsers(
            UserEntity customer,
            UserEntity operator,
            UserEntity business) {
    }
}
