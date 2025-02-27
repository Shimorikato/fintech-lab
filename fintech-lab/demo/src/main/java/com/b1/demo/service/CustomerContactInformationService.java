package com.b1.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.b1.demo.entity.CustomerContactInformation;
import com.b1.demo.repository.CustomerContactInformationRepository;


@Service
public class CustomerContactInformationService {
    @Autowired
    private CustomerContactInformationRepository customerContactInformationRepository;

    public CustomerContactInformation saveCustomerContactInformation(CustomerContactInformation customerContactInformation) {
        return customerContactInformationRepository.save(customerContactInformation);
    }

    public List<CustomerContactInformation> getAllCustomerContacts() {
        return customerContactInformationRepository.findAll();
    }
}