package com.b1.demo.controller;
import com.b1.demo.entity.*;
import com.b1.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/customer-proof")
public class CustomerProofOfIDController {
    @Autowired
    private CustomerProofOfIDService customerProofOfIDService;

    @PostMapping("/add")
    public CustomerProofOfID addCustomerProofOfID(@RequestBody CustomerProofOfID customerProofOfID) {
        return customerProofOfIDService.saveCustomerProofOfID(customerProofOfID);
    }

    @GetMapping("/all")
    public List<CustomerProofOfID> getAllCustomerProofs() {
        return customerProofOfIDService.getAllCustomerProofs();
    }
}