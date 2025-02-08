package com.b1.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.b1.demo.entity.CustomerDetail;
import com.b1.demo.repository.CustomerDetailRepository;

import java.util.List;

@Service
public class CustomerDetailService {

    @Autowired
    private CustomerDetailRepository repository;

    public List<CustomerDetail> getAllCustomers() {
        return repository.findAll();
    }

    public CustomerDetail saveCustomer(CustomerDetail customerDetail) {
        return repository.save(customerDetail);
    }

    public CustomerDetail getCustomerById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
