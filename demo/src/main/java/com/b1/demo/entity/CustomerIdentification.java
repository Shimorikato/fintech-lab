package com.b1.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "CustomerIdentification")
public class CustomerIdentification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "customer_identification_type", length = 100, nullable = false)
	private String customerIdentificationType;

	@Column(name = "customer_identification_item", length = 100, nullable = false)
	private String customerIdentificationItem;

	@ManyToOne
	@JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
	@JsonBackReference  // ✅ Prevents infinite recursion
	private CustomerDetail customerDetail;

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public CustomerDetail getCustomerDetail() {
		return customerDetail;
	}

	public void setCustomerDetail(CustomerDetail customerDetail) {
		this.customerDetail = customerDetail;
	}
}
