package com.b1.demo.controller;
import com.b1.demo.entity.*;
import com.b1.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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
