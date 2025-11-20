package com.college.food_delivery.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "customer_orders") // We use 'customer_orders' because 'order' is a reserved SQL word
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String address;

    // For this simple prototype, we will store items as a text string
    // Example: "Burger (2), Pizza (1)"
    private String items;

    private Double totalAmount;

    private LocalDateTime orderTime = LocalDateTime.now();
}