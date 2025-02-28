package com.b1.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b1.demo.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {

	User findByName(String name);

	
	 
}