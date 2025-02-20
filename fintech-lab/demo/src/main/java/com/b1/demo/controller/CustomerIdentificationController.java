package com.b1.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b1.demo.entity.CustomerIdentification;
import com.b1.demo.service.CustomerIdentificationService;

@RestController
    @RequestMapping("/customer/identifier")
public class CustomerIdentificationController {

    @Autowired
    private CustomerIdentificationService customerIdentificationService;

    @PostMapping("/add")
    public ResponseEntity<CustomerIdentification> addCustomerIdentification(@RequestBody CustomerIdentification customerIdentification) {
        CustomerIdentification savedCustomerIdentification = customerIdentificationService.saveCustomerIdentification(customerIdentification);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomerIdentification);
    }

    // Other CRUD endpoints
}
