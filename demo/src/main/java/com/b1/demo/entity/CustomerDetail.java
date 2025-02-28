package com.b1.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "CustomerDetail")
public class CustomerDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String phoneNumber;

    // One-to-Many relationship with CustomerAddress
    @JsonManagedReference 
    @OneToMany(mappedBy = "customerDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomerAddress> addresses;

     // One-to-Many relationship with CustomerIdentification
    @JsonManagedReference 
     @OneToMany(mappedBy = "customerDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomerIdentification> identifications;
    

    // Getters and Setters...

    public List<CustomerAddress> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<CustomerAddress> addresses) {
        this.addresses = addresses;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CustomerIdentification> getIdentifications() {
        return identifications;
    }

    public void setIdentifications(List<CustomerIdentification> identifications) {
        this.identifications = identifications;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
