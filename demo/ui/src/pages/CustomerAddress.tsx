import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import FormProgress from "../components/FormProgress";
import { motion } from "framer-motion";
import { useCustomer } from "../context/CustomerContext";
import { Address } from "../types/types";
import { submitCustomerDetails } from "../services/api";

const CustomerAddress = () => {
  const navigate = useNavigate();
  const { updateAddress, customerDetails } = useCustomer();
  const [formData, setFormData] = useState<
    Address & {
      effectiveDate: string;
      customerAddressValue: string;
    }
  >({
    id: 0, // Added the required id field
    effectiveDate: new Date().toISOString().split("T")[0],
    customerAddressType: "Home",
    customerAddressValue: "Primary Residence",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof Address]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Address, string>> = {};

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateAddress(formData);

      // Prepare complete customer details for submission
      const completeDetails = {
        ...customerDetails,
        addresses: [...(customerDetails.addresses || []), formData],
      } as any;

      // Log the complete details to verify all fields are included
      console.log("Submitting customer with details:", {
        name: `${completeDetails.firstName} ${completeDetails.lastName}`,
        email: completeDetails.email,
        addresses: completeDetails.addresses?.length || 0,
      });

      setIsSubmitting(true);
      try {
        const result = await submitCustomerDetails(completeDetails as any);
        setSubmitResult(result);

        if (result.success) {
          setTimeout(() => {
            navigate("/customer-list"); // Navigate to customer list instead of home
          }, 2000);
        }
      } catch (error) {
        setSubmitResult({
          success: false,
          message: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const addressTypes = ["Home", "Work", "Mailing", "Billing", "Other"];
  const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "China",
    "Brazil",
  ];

  return (
    <Layout title="Address Information" backLink="/customer-contact-details">
      <div className="max-w-2xl mx-auto">
        <FormProgress steps={4} currentStep={3} />

        <AuroraCard>
          <h2 className="text-2xl font-semibold mb-6 dark:text-white text-gray-800">
            Address Information
          </h2>

          {submitResult && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 mb-6 rounded-lg ${
                submitResult.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {submitResult.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="customerAddressType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Address Type
                  </label>
                  <select
                    id="customerAddressType"
                    name="customerAddressType"
                    value={formData.customerAddressType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    {addressTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="customerAddressValue"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Address Description
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="customerAddressValue"
                    name="customerAddressValue"
                    value={formData.customerAddressValue}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="E.g., Primary Residence"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`form-input ${
                    errors.street ? "border-red-500" : ""
                  }`}
                  placeholder="Enter street address"
                />
                {errors.street && (
                  <p className="mt-1 text-sm text-red-500">{errors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.city ? "border-red-500" : ""
                    }`}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.state ? "border-red-500" : ""
                    }`}
                    placeholder="Enter state or province"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    ZIP/Postal Code <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.zipCode ? "border-red-500" : ""
                    }`}
                    placeholder="Enter ZIP or postal code"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.zipCode}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.country ? "border-red-500" : ""
                    }`}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="effectiveDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Effective Date
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="date"
                  id="effectiveDate"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="flex justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </AuroraCard>
      </div>
    </Layout>
  );
};

export default CustomerAddress;
