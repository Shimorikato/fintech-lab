package com.b1.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.b1.demo.entity.CustomerAddress;
import com.b1.demo.repository.CustomerAddressRepository;

@Service
public class CustomerAddressService {
    @Autowired
    private CustomerAddressRepository customerAddressRepository;

    public CustomerAddress saveCustomerAddress(CustomerAddress customerAddress) {
        return customerAddressRepository.save(customerAddress);
    }

    public List<CustomerAddress> getAllCustomerAddresses() {
        return customerAddressRepository.findAll();
    }

    public CustomerAddress updateCustomerAddress(CustomerAddress customerAddress) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}