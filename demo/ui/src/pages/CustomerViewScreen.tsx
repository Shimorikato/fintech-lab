import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import { motion } from "framer-motion";
import { useCustomer } from "../context/CustomerContext";
import { CustomerDetails } from "../types/types";

const CustomerViewScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setCustomerDetails } = useCustomer();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        console.log(`Fetching customer details for ID: ${id}`);
        const response = await fetch(`/api/customers/${id}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Customer not found`);
        }

        const data = await response.json();
        console.log("Customer data:", data);
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomerDetails();
    }
  }, [id]);

  const handleEditCustomer = (customer: CustomerDetails) => {
    if (customer) {
      console.log("Setting customer details for edit:", customer);

      // Make sure all arrays are properly initialized
      const customerForEdit = {
        ...customer,
        addresses: customer.addresses || [],
        identifications: customer.identifications || [],
        contactInformation: customer.contactInformation || [],
        proofOfIdentifications: customer.proofOfIdentifications || [],
      };

      // Store the complete customer in context for pre-filling forms
      setCustomerDetails(customerForEdit);

      // Store ID in session storage
      window.sessionStorage.setItem("customerId", customer.id.toString());

      // Navigate to the customer details page
      navigate(`/customer-details/${customer.id}`);
    }
  };

  const handleReturnToList = () => {
    navigate("/customer-list");
  };

  if (loading) {
    return (
      <Layout title="Customer Details" backLink="/customer-list">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Customer Details" backLink="/customer-list">
        <AuroraCard>
          <div className="p-4 text-red-500">
            <p>{error}</p>
          </div>
        </AuroraCard>
      </Layout>
    );
  }

  if (!customer) {
    return (
      <Layout title="Customer Details" backLink="/customer-list">
        <AuroraCard>
          <div className="p-4">
            <p>Customer not found</p>
          </div>
        </AuroraCard>
      </Layout>
    );
  }

  return (
    <Layout
      title={`Customer: ${customer.firstName} ${customer.lastName}`}
      backLink="/customer-list"
    >
      <div className="h-[calc(100vh-100px)] overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        <div className="max-w-4xl mx-auto space-y-6 pb-6">
          <AuroraCard>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-800">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="font-medium">
                  {customer.firstName}{" "}
                  {customer.middleName ? customer.middleName + " " : ""}
                  {customer.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customer ID
                </p>
                <p className="font-medium">#{customer.id}</p>
              </div>
              {customer.dateOfBirth && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date of Birth
                  </p>
                  <p className="font-medium">
                    {new Date(customer.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </AuroraCard>

          <AuroraCard>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-800">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-medium">{customer.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="font-medium">{customer.phoneNumber || "N/A"}</p>
              </div>
            </div>

            {customer.contactInformation &&
              customer.contactInformation.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">
                    Additional Contact Details
                  </h3>
                  {customer.contactInformation.map(
                    (contact: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-2"
                      >
                        <p>
                          <span className="font-medium">
                            {contact.contactType}:
                          </span>{" "}
                          {contact.contactValue}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
          </AuroraCard>

          <AuroraCard>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-800">
              Addresses
            </h2>
            {customer.addresses && customer.addresses.length > 0 ? (
              <div className="space-y-4">
                {customer.addresses.map((address: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">
                        {address.customerAddressType} Address
                      </h3>
                    </div>
                    <p className="mt-2">{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No addresses found</p>
            )}
          </AuroraCard>

          <AuroraCard>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-800">
              Identification
            </h2>

            {customer.proofOfIdentifications &&
              customer.proofOfIdentifications.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">
                    Proof of Identity
                  </h3>
                  {customer.proofOfIdentifications.map(
                    (proof: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-2"
                      >
                        <p>
                          <span className="font-medium">
                            {proof.proofOfIDType}:
                          </span>{" "}
                          {proof.proofOfIDValue}
                        </p>
                        {proof.startDate && (
                          <p>
                            <span className="font-medium">Issued:</span>{" "}
                            {new Date(proof.startDate).toLocaleDateString()}
                          </p>
                        )}
                        {proof.endDate && (
                          <p>
                            <span className="font-medium">Expires:</span>{" "}
                            {new Date(proof.endDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}

            {customer.identifications &&
              customer.identifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Official Identifiers
                  </h3>
                  {customer.identifications.map((id: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-2"
                    >
                      <p>
                        <span className="font-medium">
                          {id.customerIdentificationItem}:
                        </span>{" "}
                        {id.customerIdentificationType}
                      </p>
                      {id.customerIdentifier && (
                        <p>
                          <span className="font-medium">Value:</span>{" "}
                          {id.customerIdentifier}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {!customer.proofOfIdentifications?.length &&
              !customer.identifications?.length && (
                <p className="text-gray-500">
                  No identification information found
                </p>
              )}
          </AuroraCard>

          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
              onClick={handleReturnToList}
            >
              Return to List
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              onClick={() => handleEditCustomer(customer)}
            >
              Edit Customer
            </motion.button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerViewScreen;
