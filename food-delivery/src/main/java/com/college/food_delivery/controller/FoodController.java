package com.college.food_delivery.controller;

import com.college.food_delivery.model.FoodItem;
import com.college.food_delivery.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Marks this class as an API Handler
@RequestMapping("/api/menu") // All URLs will start with /api/menu
@CrossOrigin(origins = "*") // Allow HTML/JS from any port to access this
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    // 1. GET API: Fetch all food items
    // URL: http://localhost:8080/api/menu
    @GetMapping
    public List<FoodItem> getAllFood() {
        return foodRepository.findAll();
    }

    // 2. POST API: Add a new food item (Useful for testing)
    // URL: http://localhost:8080/api/menu
    @PostMapping
    public FoodItem addFood(@RequestBody FoodItem foodItem) {
        return foodRepository.save(foodItem);
    }
}