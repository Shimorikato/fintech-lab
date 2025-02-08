package com.b1.demo.service;

import java.util.List;


import com.b1.demo.entity.User;
import com.b1.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {
 @Autowired
 private UserRepository userRepository;
 public List<User> getAllUsers() {
 return userRepository.findAll();
 }
 public User saveUser(User user) {
 return userRepository.save(user);
 }
 public User findByName(String name) {
 return userRepository.findByName(name);
 }
}
