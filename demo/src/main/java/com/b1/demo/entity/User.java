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
private long  amount;
private int bankId;
private String gender;
private String Country;
private int age;
private String language;

public String getLanguage() {
    return language;
}
public void setLanguage(String language) {
    this.language = language;
}
public String getGender() {
    return gender;
}
public void setGender(String gender) {
    this.gender = gender;
}
public String getCountry() {
    return Country;
}
public void setCountry(String country) {
    Country = country;
}
public int getAge() {
    return age;
}
public void setAge(int age) {
    this.age = age;
}



// Getters and Setters

public String getName() {
	return name;
}
public long  getAmount() {
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
