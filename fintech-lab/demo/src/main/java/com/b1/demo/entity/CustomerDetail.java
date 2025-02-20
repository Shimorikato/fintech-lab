package com.b1.demo.entity;

import com.b1.demo.entity.CustomerAddress;
import com.b1.demo.entity.CustomerIdentification;
import jakarta.persistence.*;
import java.util.List;

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

    // One-to-Many relationship with CustomerIdentification
    @OneToMany(mappedBy = "customerDetail", cascade = CascadeType.ALL)
    private List<CustomerIdentification> identifications;

    // One-to-Many relationship with CustomerAddress
    @OneToMany(mappedBy = "customerDetail", cascade = CascadeType.ALL)
    private List<CustomerAddress> addresses;

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
