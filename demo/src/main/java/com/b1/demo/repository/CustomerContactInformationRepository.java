package com.b1.demo.repository;

import com.b1.demo.entity.CustomerContactInformation;
import com.b1.demo.entity.CustomerProofOfID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.b1.demo.entity.CustomerDetail;
import org.springframework.stereotype.Repository;
@Repository
public interface CustomerContactInformationRepository extends JpaRepository<CustomerContactInformation, Long> {}
