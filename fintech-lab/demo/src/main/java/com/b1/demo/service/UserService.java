package com.b1.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.b1.demo.entity.User;
import com.b1.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    
     //Fetch all users from the database.
     
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

  
    public User saveUser(User user) {
        return userRepository.save(user);
    }

   
     //Find a user by their name.
   
    public User findByName(String name) {
        return userRepository.findByName(name);
    }

    
    // Validate user credentials (check username and password).
     
    public User validateUser(User user) {
        if (user == null || user.getName() == null || user.getPassword() == null) {
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username and password must not be null");
        }

        Optional<User> existingUser = Optional.ofNullable(userRepository.findByName(user.getName()));

        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return existingUser.get();// Login successful
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
    }
}
