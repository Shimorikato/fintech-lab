package com.b1.demo.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity
@Table(name = "CustomerIdentification")
public class CustomerIdentification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "CustomerIdentifier", referencedColumnName = "id")
    private CustomerDetail customerDetail;

    @Column(name = "CustomerIdentificationType", length = 100)
    private String customerIdentificationType;

    @Column(name = "CustomerIdentificationItem", length = 100)
    private String customerIdentificationItem;

    @Column(name = "EffectiveDate")
    private LocalDate effectiveDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public CustomerDetail getCustomerDetail() {
		return customerDetail;
	}

	public void setCustomerDetail(CustomerDetail customerDetail) {
		this.customerDetail = customerDetail;
	}

	public String getCustomerIdentificationType() {
		return customerIdentificationType;
	}

	public void setCustomerIdentificationType(String customerIdentificationType) {
		this.customerIdentificationType = customerIdentificationType;
	}

	public String getCustomerIdentificationItem() {
		return customerIdentificationItem;
	}

	public void setCustomerIdentificationItem(String customerIdentificationItem) {
		this.customerIdentificationItem = customerIdentificationItem;
	}

	public LocalDate getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(LocalDate effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

   
}
