	package com.b1.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.b1.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String name);
    // Add custom query methods here if needed
}