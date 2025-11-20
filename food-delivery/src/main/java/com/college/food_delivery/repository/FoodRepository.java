package com.college.food_delivery.repository;

import com.college.food_delivery.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<FoodItem, Long> {
    // We don't need to write any code here!
    // JpaRepository gives us methods like .save(), .findAll(), .findById() for free.
}