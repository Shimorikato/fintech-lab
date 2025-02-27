package com.b1.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.b1.demo.entity.CustomerDetail;
import com.b1.demo.repository.CustomerDetailRepository;

@Service
public class CustomerDetailService {

    @Autowired
    private CustomerDetailRepository customerDetailRepository;

    // ✅ Add a new customer
    public CustomerDetail addCustomer(CustomerDetail customerDetail) {
        if (customerDetail == null) {
            throw new IllegalArgumentException("CustomerDetail cannot be null");
        }
    
        // Ensure customerDetail is detached or new
        customerDetail.setId(null);
    
        // Handle addresses
        if (customerDetail.getAddresses() != null) {
            customerDetail.getAddresses().forEach(address -> {
                address.setCustomerDetail(customerDetail);
                address.setId(null); // Ensure new addresses are always created
            });
        }
    
        // Handle identifications
        if (customerDetail.getIdentifications() != null) {
            customerDetail.getIdentifications().forEach(identification -> {
                identification.setCustomerDetail(customerDetail);
                identification.setId(null); // Prevent detached entity issues
            });
        }
    
        // Save the customer and return
        return customerDetailRepository.save(customerDetail);
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
    public String deleteCustomer(Long id) {
        return customerDetailRepository.findById(id).map(existingCustomer -> {
            customerDetailRepository.delete(existingCustomer);
            return "Customer with ID " + id + " deleted successfully.";
        }).orElseThrow(() -> new RuntimeException("Customer with ID " + id + " not found."));  
    }
    // ✅ update customer by ID
    public CustomerDetail updateCustomer(Long id, CustomerDetail customerDetail) {
        return customerDetailRepository.findById(id).map(existingCustomer -> {
            if (customerDetail.getFirstName() != null)
                existingCustomer.setFirstName(customerDetail.getFirstName());
            existingCustomer.setMiddleName(customerDetail.getMiddleName());
            existingCustomer.setLastName(customerDetail.getLastName());
            existingCustomer.setEmail(customerDetail.getEmail());
            existingCustomer.setPhoneNumber(customerDetail.getPhoneNumber());
    
            return customerDetailRepository.save(existingCustomer);
        }).orElseThrow(() -> new RuntimeException("Customer with ID " + id + " not found."));
    }
    
}
