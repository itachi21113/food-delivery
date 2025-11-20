package com.college.food_delivery.controller;

import com.college.food_delivery.model.Order;
import com.college.food_delivery.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // API Endpoint: POST http://localhost:8080/api/orders
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        // This saves the incoming JSON directly to the customer_orders table
        return orderRepository.save(order);
    }
}