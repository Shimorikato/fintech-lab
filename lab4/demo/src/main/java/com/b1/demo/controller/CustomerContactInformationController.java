package com.b1.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b1.demo.entity.CustomerContactInformation;
import com.b1.demo.service.CustomerContactInformationService;
@RestController
@RequestMapping("/customer-contact")
public class CustomerContactInformationController {
    @Autowired
    private CustomerContactInformationService customerContactInformationService;

    @PostMapping("/add")
    public CustomerContactInformation addCustomerContactInformation(@RequestBody CustomerContactInformation customerContactInformation) {
        return customerContactInformationService.saveCustomerContactInformation(customerContactInformation);
    }

    @GetMapping("/all")
    public List<CustomerContactInformation> getAllCustomerContacts() {
        return customerContactInformationService.getAllCustomerContacts();
    }
}
