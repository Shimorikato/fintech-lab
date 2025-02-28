package com.b1.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b1.demo.entity.CustomerDetail;
import com.b1.demo.service.CustomerDetailService;

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
    @PutMapping("/update/{id}")
public ResponseEntity<CustomerDetail> updateCustomer(@PathVariable Long id, @RequestBody CustomerDetail customerDetail) {
    CustomerDetail updatedCustomer = customerDetailService.updateCustomer(id, customerDetail);
    return ResponseEntity.ok(updatedCustomer);}

    @DeleteMapping("/delete/{id}")
public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
    String response = customerDetailService.deleteCustomer(id);
    return ResponseEntity.ok(response);
}


}

