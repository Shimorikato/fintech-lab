package com.b1.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.b1.demo.entity.CustomerIdentification;
public interface CustomerIdentificationRepository extends JpaRepository<CustomerIdentification, Integer> {
}
