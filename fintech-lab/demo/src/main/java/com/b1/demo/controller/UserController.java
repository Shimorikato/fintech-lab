package com.b1.demo.controller;

import com.b1.demo.entity.User;
import com.b1.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/users")
public class UserController {
 @Autowired
 private UserService userService;
 @GetMapping
 public List<User> getAllUsers() {
 return userService.getAllUsers();
 }
 @PostMapping
 public User createUser(@RequestBody User user) {
 return userService.saveUser(user);
 }

 
	@GetMapping("/getCustomerDetails/{name}")
	public User getCustomerDetailsByName(@PathVariable String name) {
		
		return userService.findByName(name);
		
	}
}
