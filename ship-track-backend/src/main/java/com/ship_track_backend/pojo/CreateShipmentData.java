package com.ship_track_backend.pojo;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateShipmentData {

    // ================= RECEIVER DETAILS =================

    @NotBlank(message = "Receiver name is required")
    private String receiverName;

    @NotBlank(message = "Receiver phone is required")
    private String receiverPhone;


    // ================= PICKUP LOCATION =================

    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    @NotBlank(message = "Pickup city is required")
    private String pickupCity;

    @NotBlank(message = "Pickup state is required")
    private String pickupState;

    @NotBlank(message = "Pickup pincode is required")
    private String pickupPincode;


    // ================= DELIVERY LOCATION =================

    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    @NotBlank(message = "Delivery city is required")
    private String deliveryCity;

    @NotBlank(message = "Delivery state is required")
    private String deliveryState;

    @NotBlank(message = "Delivery pincode is required")
    private String deliveryPincode;


    // ================= PACKAGE DETAILS =================

    private String packageDescription;

    @NotNull(message = "Weight is required")
    @DecimalMin(
        value = "0.1",
        message = "Weight must be greater than 0"
    )
    private BigDecimal weight;
}