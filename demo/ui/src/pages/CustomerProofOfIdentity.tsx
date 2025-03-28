import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import FormProgress from "../components/FormProgress";
import { motion } from "framer-motion";
import { useCustomer } from "../context/CustomerContext";
import { ProofOfIdentification, Identification } from "../types/types";

const CustomerProofOfIdentity = () => {
  const navigate = useNavigate();
  const { updateProofOfIdentification, updateIdentification, customerDetails } =
    useCustomer();
  const [isEditing] = useState(
    Boolean(window.sessionStorage.getItem("customerId"))
  );

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

  useEffect(() => {
    if (isEditing) {
      console.log("Pre-filling proof of ID form with:", customerDetails);

      // Pre-fill proof of ID if available
      if (
        customerDetails.proofOfIdentifications &&
        customerDetails.proofOfIdentifications.length > 0
      ) {
        const existingProof = customerDetails.proofOfIdentifications[0];
        setFormData((prev) => ({
          ...prev,
          proofOfID: {
            id: existingProof.id || 0,
            proofOfIDType: existingProof.proofOfIDType || "Passport",
            proofOfIDValue: existingProof.proofOfIDValue || "",
            startDate:
              existingProof.startDate?.split("T")[0] ||
              new Date().toISOString().split("T")[0],
            endDate:
              existingProof.endDate?.split("T")[0] ||
              new Date(new Date().setFullYear(new Date().getFullYear() + 10))
                .toISOString()
                .split("T")[0],
            effectiveDate:
              existingProof.effectiveDate?.split("T")[0] ||
              new Date().toISOString().split("T")[0],
          },
        }));
      }

      // Pre-fill identification if available
      if (
        customerDetails?.identifications &&
        customerDetails.identifications.length > 0
      ) {
        const existingId = customerDetails.identifications[0];
        setFormData((prev) => ({
          ...prev,
          identification: {
            id: existingId.id || 0,
            customerIdentificationItem:
              existingId.customerIdentificationItem || "SSN",
            customerIdentificationType:
              existingId.customerIdentificationType || "Government ID",
            effectiveDate:
              (existingId as any).effectiveDate?.split("T")[0] ||
              new Date().toISOString().split("T")[0],
            customerIdentifier: (existingId as any).customerIdentifier || "",
          },
        }));
      }
    }
  }, [isEditing, customerDetails]);

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
      // Get the customer ID
      const customerId = window.sessionStorage.getItem("customerId");
      const customerIdNumber = customerId ? parseInt(customerId, 10) : null;

      // Format dates properly - ensure it always returns a string
      const formatDate = (date: string) => (date ? date.split("T")[0] : new Date().toISOString().split("T")[0]);

      // Convert string dates to proper format for backend
      const formattedProofOfID = {
        ...formData.proofOfID,
        // Use 0 as default for new entities instead of null to match the ProofOfIdentification type
        id: isEditing && formData.proofOfID.id ? formData.proofOfID.id : 0,
        // Format dates properly
        startDate: formatDate(formData.proofOfID.startDate),
        endDate: formatDate(formData.proofOfID.endDate),
        effectiveDate: formatDate(formData.proofOfID.effectiveDate),
        // This is critical - the relationship field must be set
        customerDetail: {
          id: customerIdNumber || 0,
        },
      };

      const formattedIdentification = {
        ...formData.identification,
        // Use 0 as default for new entities instead of null to match the Identification type
        id:
          isEditing && formData.identification.id
            ? formData.identification.id
            : 0,
        customerIdentifier: formData.identification.customerIdentifier,
        // Format date properly
        effectiveDate: formatDate(formData.identification.effectiveDate),
        // This is critical - the relationship field must be set
        customerDetail: {
          id: customerIdNumber || 0,
        },
      };

      console.log("Submitting proof of ID:", formattedProofOfID);
      console.log("Submitting identification:", formattedIdentification);

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
