package com.b1.demo.entity;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
@Entity
public class CustomerProofOfID {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerDetail customer;

    private String proofOfIDType;
    private String proofOfIDValue;
    private LocalDate effectiveDate;
    private LocalDate startDate;
    private LocalDate endDate;

    public CustomerDetail getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDetail customer) {
        this.customer = customer;
    }

    public LocalDate getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(LocalDate effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProofOfIDType() {
        return proofOfIDType;
    }

    public void setProofOfIDType(String proofOfIDType) {
        this.proofOfIDType = proofOfIDType;
    }

    public String getProofOfIDValue() {
        return proofOfIDValue;
    }

    public void setProofOfIDValue(String proofOfIDValue) {
        this.proofOfIDValue = proofOfIDValue;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
// Getters and Setters
}
