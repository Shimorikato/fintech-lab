package com.b1.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.b1.demo.entity.CustomerProofOfID;
import com.b1.demo.repository.CustomerProofOfIDRepository;

@Service
public class CustomerProofOfIDService {
    @Autowired
    private CustomerProofOfIDRepository customerProofOfIDRepository;

    public CustomerProofOfID saveCustomerProofOfID(CustomerProofOfID customerProofOfID) {
        return customerProofOfIDRepository.save(customerProofOfID);
    }

    public List<CustomerProofOfID> getAllCustomerProofs() {
        return customerProofOfIDRepository.findAll();
    }
}
