package com.b1.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.b1.demo.entity.CustomerIdentification;
import com.b1.demo.repository.CustomerIdentificationRepository;

@Service
public class CustomerIdentificationService {

    @Autowired
    private CustomerIdentificationRepository customerIdentificationRepository;

    public CustomerIdentification saveCustomerIdentification(CustomerIdentification customerIdentification) {
        return customerIdentificationRepository.save(customerIdentification);
    }

    // Other CRUD methods
}
