package com.b1.demo.service;
import com.b1.demo.entity.*;
import com.b1.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


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