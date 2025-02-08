package com.b1.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.b1.demo.entity.CustomerDetail;

public interface CustomerDetailRepository extends JpaRepository<CustomerDetail, Long> {
    // You can add custom queries if needed
}

