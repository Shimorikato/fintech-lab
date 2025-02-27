package com.b1.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.b1.demo.entity.CustomerProofOfID;

@Repository
public interface CustomerProofOfIDRepository extends JpaRepository<CustomerProofOfID, Long> {}
