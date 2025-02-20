package com.b1.demo.service;

import com.b1.demo.entity.CustomerDetail;
import com.b1.demo.repository.CustomerDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerDetailService {

    @Autowired
    private CustomerDetailRepository customerDetailRepository;

    // ✅ Add a new customer
    public CustomerDetail addCustomer(CustomerDetail customer) {
        return customerDetailRepository.save(customer);
    }

    // ✅ Get all customers
    public List<CustomerDetail> getAllCustomers() {
        return customerDetailRepository.findAll();
    }

    // ✅ Get customer by ID
    public CustomerDetail getCustomerById(Long id) {
        return customerDetailRepository.findById(id).orElse(null);
    }

    // ✅ Delete customer by ID
    public void deleteCustomer(Long id) {
        customerDetailRepository.deleteById(id);
    }
}
