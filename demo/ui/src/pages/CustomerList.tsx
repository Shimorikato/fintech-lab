import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import { motion } from "framer-motion";
import { deleteCustomer, fetchCustomers } from "../services/api";
import { CustomerDetails } from "../types/types";
import { useCustomer } from "../context/CustomerContext";

const CustomerListScreen = () => {
  const navigate = useNavigate();
  const { setCustomerDetails } = useCustomer();
  const [customers, setCustomers] = useState<CustomerDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  // Function to load customers
  const loadCustomers = async () => {
    try {
      setLoading(true);
      console.log("Fetching customers...");
      const data = await fetchCustomers();
      console.log("Customer data received:", data);
      setCustomers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Function to handle customer delete
  const handleDeleteCustomer = async (customerId: number) => {
    try {
      const result = await deleteCustomer(customerId);

      if (result.success) {
        setDeleteStatus({ message: result.message, isError: false });
        // Refresh customer list after successful deletion
        loadCustomers();
      } else {
        setDeleteStatus({ message: result.message, isError: true });
      }

      // Clear the status message after 3 seconds
      setTimeout(() => {
        setDeleteStatus(null);
      }, 3000);
    } catch (error) {
      setDeleteStatus({
        message:
          error instanceof Error ? error.message : "Failed to delete customer",
        isError: true,
      });
    }
  };

  // Function to handle customer view
  const handleViewCustomer = (customer: CustomerDetails) => {
    navigate(`/customer-view/${customer.id}`);
  };

  // Function to handle customer edit
  const handleEditCustomer = (customer: CustomerDetails) => {
    // Store the customer details in the context
    setCustomerDetails(customer);
    // Also store the ID in session storage for consistency
    window.sessionStorage.setItem("customerId", customer.id.toString());
    // Navigate to the edit form
    navigate(`/customer-details/${customer.id}`);
  };

  return (
    <Layout title="Customer List" backLink="/">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold dark:text-white text-gray-800">
            All Customers
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            onClick={() => navigate("/customer-details")}
          >
            Add New Customer
          </motion.button>
        </div>

        {deleteStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 mb-4 rounded-md ${
              deleteStatus.isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {deleteStatus.message}
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <AuroraCard>
            <div className="p-4 text-red-500">
              <p>{error}</p>
              <p className="mt-2">
                Please make sure your API server is running at
                http://localhost:8080
              </p>
            </div>
          </AuroraCard>
        ) : customers.length === 0 ? (
          <AuroraCard>
            <div className="p-8 text-center">
              <h3 className="text-xl font-medium mb-2 dark:text-white text-gray-800">
                No customers found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start by adding your first customer.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => navigate("/customer-details")}
              >
                Add Customer
              </motion.button>
            </div>
          </AuroraCard>
        ) : (
          <AuroraCard>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {customers.map((customer: CustomerDetails) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        {customer.firstName} {customer.lastName}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        {customer.email}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        {customer.phoneNumber || "N/A"}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-wrap"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        {customer.addresses && customer.addresses.length > 0
                          ? `${customer.addresses[0].street}, ${customer.addresses[0].city}`
                          : "N/A"}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        {customer.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString()
                          : new Date(customer.id).toLocaleDateString()}{" "}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-blue-500 hover:text-blue-700 mr-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCustomer(customer);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "Are you sure you want to delete this customer?"
                              )
                            ) {
                              handleDeleteCustomer(customer.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AuroraCard>
        )}
      </div>
    </Layout>
  );
};

export default CustomerListScreen;
