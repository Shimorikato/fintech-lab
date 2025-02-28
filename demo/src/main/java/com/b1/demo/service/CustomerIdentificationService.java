package com.b1.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.b1.demo.entity.CustomerDetail;
import com.b1.demo.entity.CustomerIdentification;
import com.b1.demo.repository.CustomerDetailRepository;
import com.b1.demo.repository.CustomerIdentificationRepository;

@Service
public class CustomerIdentificationService {

    @Autowired
    private CustomerIdentificationRepository customerIdentificationRepository;

    @Autowired
    private CustomerDetailRepository customerDetailRepository;

    public CustomerIdentification saveCustomerIdentification(CustomerIdentification customerIdentification) {
        // Ensure customerDetail is not null
        if (customerIdentification.getCustomerDetail() == null || 
            customerIdentification.getCustomerDetail().getId() == null) {
            throw new IllegalArgumentException("CustomerDetail ID must be provided");
        }

        // Fetch existing CustomerDetail from the database
        CustomerDetail existingCustomer = customerDetailRepository.findById(customerIdentification.getCustomerDetail().getId())
            .orElseThrow(() -> new RuntimeException("CustomerDetail not found with ID: " + customerIdentification.getCustomerDetail().getId()));

        // Set the managed entity before saving
        customerIdentification.setCustomerDetail(existingCustomer);

        return customerIdentificationRepository.save(customerIdentification);
    }
}
