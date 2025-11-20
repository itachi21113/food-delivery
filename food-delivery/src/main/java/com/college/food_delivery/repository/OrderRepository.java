package com.college.food_delivery.repository;

import com.college.food_delivery.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // This gives us .save(order) capability automatically
}