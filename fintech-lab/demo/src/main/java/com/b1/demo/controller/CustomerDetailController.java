package com.b1.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.b1.demo.entity.CustomerDetail;
import com.b1.demo.service.CustomerDetailService;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerDetailController {

    @Autowired
    private CustomerDetailService customerDetailService;

    @GetMapping
    public List<CustomerDetail> getAllCustomers() {
        return customerDetailService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public CustomerDetail getCustomerById(@PathVariable Long id) {
        return customerDetailService.getCustomerById(id);
    }

    @PostMapping("/add")
    public CustomerDetail addCustomer(@RequestBody CustomerDetail customerDetail) {
        return customerDetailService.addCustomer(customerDetail);
    }
}
