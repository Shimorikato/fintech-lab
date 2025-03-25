import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import FormProgress from "../components/FormProgress";
import { motion } from "framer-motion";
import { useCustomer } from "../context/CustomerContext";
import { ProofOfIdentification, Identification } from "../types/types";

const CustomerProofOfIdentity = () => {
  const navigate = useNavigate();
  const { updateProofOfIdentification, updateIdentification } = useCustomer();
  const [formData, setFormData] = useState<{
    proofOfID: ProofOfIdentification;
    identification: Identification & {
      effectiveDate: string;
      customerIdentifier: string;
    };
  }>({
    proofOfID: {
      id: 0, // Added missing required field
      proofOfIDType: "Passport",
      proofOfIDValue: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 10))
        .toISOString()
        .split("T")[0],
      effectiveDate: new Date().toISOString().split("T")[0],
    },
    identification: {
      id: 0, // Added missing required field
      customerIdentificationItem: "SSN",
      customerIdentificationType: "Government ID",
      effectiveDate: new Date().toISOString().split("T")[0],
      customerIdentifier: "",
    },
  });
  const [errors, setErrors] = useState<{
    proofOfIDValue?: string;
    customerIdentifier?: string;
  }>({});

  const handleProofChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      proofOfID: { ...prev.proofOfID, [name]: value },
    }));

    if (errors.proofOfIDValue && name === "proofOfIDValue") {
      setErrors((prev) => ({ ...prev, proofOfIDValue: undefined }));
    }
  };

  const handleIdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      identification: { ...prev.identification, [name]: value },
    }));

    if (errors.customerIdentifier && name === "customerIdentifier") {
      setErrors((prev) => ({ ...prev, customerIdentifier: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      proofOfIDValue?: string;
      customerIdentifier?: string;
    } = {};

    if (!formData.proofOfID.proofOfIDValue.trim()) {
      newErrors.proofOfIDValue = "ID value is required";
    }

    if (!formData.identification.customerIdentifier.trim()) {
      newErrors.customerIdentifier = "Identifier is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert string dates to proper format for backend
      const formattedProofOfID = {
        ...formData.proofOfID,
        // Use null instead of undefined for new entities
        id: 0,
        // Ensure dates are in ISO format
        startDate: formData.proofOfID.startDate,
        endDate: formData.proofOfID.endDate,
        effectiveDate: formData.proofOfID.effectiveDate,
        // This is critical - the relationship field must be set
        customerDetail: {
          id: window.sessionStorage.getItem("customerId") || null,
        },
      };

      const formattedIdentification = {
        ...formData.identification,
        // Use null instead of undefined for new entities
        id: 0,
        // This is critical - the relationship field must be set
        customerDetail: {
          id: window.sessionStorage.getItem("customerId") || null,
        },
      };

      updateProofOfIdentification(formattedProofOfID);
      updateIdentification(formattedIdentification);
      navigate("/customer-contact-details");
    }
  };

  const idTypes = ["Passport", "Driver License", "National ID", "Military ID"];
  const identificationTypes = [
    "SSN",
    "Tax ID",
    "Passport Number",
    "Driver License Number",
  ];

  return (
    <Layout title="Proof of Identity" backLink="/customer-name">
      <div className="max-w-2xl mx-auto">
        <FormProgress steps={4} currentStep={1} />

        <AuroraCard>
          <h2 className="text-2xl font-semibold mb-6 dark:text-white text-gray-800">
            Identity Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-4 dark:text-white text-gray-800">
                  Proof of Identification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="proofOfIDType"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      ID Type
                    </label>
                    <select
                      id="proofOfIDType"
                      name="proofOfIDType"
                      value={formData.proofOfID.proofOfIDType}
                      onChange={handleProofChange}
                      className="form-input"
                    >
                      {idTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="proofOfIDValue"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      ID Value <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="proofOfIDValue"
                      name="proofOfIDValue"
                      value={formData.proofOfID.proofOfIDValue}
                      onChange={handleProofChange}
                      className={`form-input ${
                        errors.proofOfIDValue ? "border-red-500" : ""
                      }`}
                      placeholder="Enter ID number"
                    />
                    {errors.proofOfIDValue && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.proofOfIDValue}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Issue Date
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.proofOfID.startDate}
                      onChange={handleProofChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Expiry Date
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.proofOfID.endDate}
                      onChange={handleProofChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4 dark:text-white text-gray-800">
                  Identification Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="customerIdentificationItem"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Identification Type
                    </label>
                    <select
                      id="customerIdentificationItem"
                      name="customerIdentificationItem"
                      value={formData.identification.customerIdentificationItem}
                      onChange={handleIdChange}
                      className="form-input"
                    >
                      {identificationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="customerIdentifier"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Identifier <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="customerIdentifier"
                      name="customerIdentifier"
                      value={formData.identification.customerIdentifier}
                      onChange={handleIdChange}
                      className={`form-input ${
                        errors.customerIdentifier ? "border-red-500" : ""
                      }`}
                      placeholder="Enter identifier"
                    />
                    {errors.customerIdentifier && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.customerIdentifier}
                      </p>
                    )}
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

export default CustomerProofOfIdentity;
