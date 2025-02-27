package com.b1.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b1.demo.entity.CustomerAddress;
import com.b1.demo.service.CustomerAddressService;

@RestController
@RequestMapping("/customer-address")
public class CustomerAddressController {
    @Autowired
    private CustomerAddressService customerAddressService;

    public CustomerAddressController() {
    }

    @PostMapping("/add")
    public CustomerAddress addCustomerAddress(@RequestBody CustomerAddress customerAddress) {
        return customerAddressService.saveCustomerAddress(customerAddress);
    }

    @GetMapping("/all")
    public List<CustomerAddress> getAllCustomerAddresses() {
        return customerAddressService.getAllCustomerAddresses();
    }
    @PutMapping("/put")
    public CustomerAddress updateCustomerAddress(@RequestBody CustomerAddress customerAddress) {
        return customerAddressService.updateCustomerAddress(customerAddress);}
}
