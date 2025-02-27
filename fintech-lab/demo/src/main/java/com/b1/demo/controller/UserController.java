package com.b1.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b1.demo.entity.User;
import com.b1.demo.service.UserService;
@RestController
@RequestMapping("/api/users")
public class UserController {
 @Autowired
 private UserService userService;
 @GetMapping
 public List<User> getAllUsers() {
 return userService.getAllUsers();
 }
 @PostMapping("/check")
 public User validateUser(@RequestBody User user) {
	   return userService.validateUser(user);
 }

 
@GetMapping("/getCustomerDetails/{name}")
	public User getCustomerDetailsByName(@PathVariable String name) {
		
		return userService.findByName(name);
		
	}
}
