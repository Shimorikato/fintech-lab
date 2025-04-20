package com.fintech.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

    @GetMapping("/hello")
    public String helloGet() {
        return "Hello, World!";
    }

    @PostMapping("/hello")
    public String helloPost() {
        return "{\"message\": \"Hello, World!\"}";
    }
}
