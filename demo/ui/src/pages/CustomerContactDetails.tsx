import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import FormProgress from "../components/FormProgress";
import { motion } from "framer-motion";
import { useCustomer } from "../context/CustomerContext";
import { ContactInformation } from "../types/types"; // Uncommented and fixed path

const CustomerContactDetails = () => {
  const navigate = useNavigate();
  const {
    updateContactInformation,
    updateEmail,
    updatePhoneNumber,
    customerDetails,
  } = useCustomer();
  const [formData, setFormData] = useState<{
    email: string;
    phoneNumber: string;
    contactInfo: ContactInformation;
  }>({
    email: customerDetails.email || "",
    phoneNumber: customerDetails.phoneNumber || "",
    contactInfo: {
      id: 0, // Added required id field
      contactType: "Mobile",
      contactValue: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      effectiveDate: new Date().toISOString().split("T")[0],
    },
  });
  const [errors, setErrors] = useState<{
    email?: string;
    phoneNumber?: string;
    contactValue?: string;
  }>({});

  useEffect(() => {
    if (customerDetails) {
      setFormData({
        email: customerDetails.email || "",
        phoneNumber: customerDetails.phoneNumber || "",
        contactInfo: {
          id: customerDetails.contactInformation?.[0]?.id || 0,
          contactType:
            customerDetails.contactInformation?.[0]?.contactType || "Mobile",
          contactValue:
            customerDetails.contactInformation?.[0]?.contactValue || "",
          startDate:
            customerDetails.contactInformation?.[0]?.startDate?.split("T")[0] ||
            new Date().toISOString().split("T")[0],
          endDate:
            customerDetails.contactInformation?.[0]?.endDate?.split("T")[0] ||
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .split("T")[0],
          effectiveDate:
            customerDetails.contactInformation?.[0]?.effectiveDate?.split(
              "T"
            )[0] || new Date().toISOString().split("T")[0],
        },
      });
    }
  }, [customerDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));

    if (errors.contactValue && name === "contactValue") {
      setErrors((prev) => ({ ...prev, contactValue: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
      phoneNumber?: string;
      contactValue?: string;
    } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\+?[0-9\-\s]+$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.contactInfo.contactValue.trim()) {
      newErrors.contactValue = "Contact value is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateEmail(formData.email);
      updatePhoneNumber(formData.phoneNumber);
      updateContactInformation(formData.contactInfo);
      navigate("/customer-address");
    }
  };

  const contactTypes = ["Mobile", "Home", "Work", "Other"];

  return (
    <Layout title="Contact Details" backLink="/customer-proof-of-identity">
      <div className="max-w-2xl mx-auto">
        <FormProgress steps={4} currentStep={2} />

        <AuroraCard>
          <h2 className="text-2xl font-semibold mb-6 dark:text-white text-gray-800">
            Contact Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.phoneNumber ? "border-red-500" : ""
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4 dark:text-white text-gray-800">
                  Additional Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contactType"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Contact Type
                    </label>
                    <select
                      id="contactType"
                      name="contactType"
                      value={formData.contactInfo.contactType}
                      onChange={handleContactChange}
                      className="form-input"
                    >
                      {contactTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contactValue"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Contact Value <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="contactValue"
                      name="contactValue"
                      value={formData.contactInfo.contactValue}
                      onChange={handleContactChange}
                      className={`form-input ${
                        errors.contactValue ? "border-red-500" : ""
                      }`}
                      placeholder="Enter contact value"
                    />
                    {errors.contactValue && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.contactValue}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Start Date
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.contactInfo.startDate}
                      onChange={handleContactChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      End Date
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.contactInfo.endDate}
                      onChange={handleContactChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-primary"
                >
                  Next
                </motion.button>
              </div>
            </div>
          </form>
        </AuroraCard>
      </div>
    </Layout>
  );
};

export default CustomerContactDetails;
