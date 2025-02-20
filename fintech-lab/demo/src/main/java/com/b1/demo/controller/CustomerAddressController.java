package com.b1.demo.controller;
import com.b1.demo.entity.*;
import com.b1.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/customer-address")
public class CustomerAddressController {
    @Autowired
    private CustomerAddressService customerAddressService;

    @PostMapping("/add")
    public CustomerAddress addCustomerAddress(@RequestBody CustomerAddress customerAddress) {
        return customerAddressService.saveCustomerAddress(customerAddress);
    }

    @GetMapping("/all")
    public List<CustomerAddress> getAllCustomerAddresses() {
        return customerAddressService.getAllCustomerAddresses();
    }

}
