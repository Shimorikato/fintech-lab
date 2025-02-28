package com.b1.demo.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
private String name;
private String password;
private int amount;
private int bankId;


// Getters and Setters

public String getName() {
	return name;
}
public int getAmount() {
    return amount;
}
public void setAmount(int amount) {
    this.amount = amount;
}
public int getBankId() {
    return bankId;
}
public void setBankId(int bankId) {
    this.bankId = bankId;
}
public void setName(String name) {
	this.name = name;
}
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
