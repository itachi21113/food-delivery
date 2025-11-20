package com.college.food_delivery.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Lombok: Generates Getters, Setters, and toString automatically
@NoArgsConstructor // Generates empty constructor
@AllArgsConstructor // Generates constructor with all arguments
@Table(name = "food_items") // This will be the table name in MySQL
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    private String name;

    private Double price;

    private String category; // e.g., "Burger", "Pizza"

    @Column(length = 1000) // Allow longer URLs
    private String imageUrl;
}