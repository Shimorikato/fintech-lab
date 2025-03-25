import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import { motion } from "framer-motion";
// import { CustomerDetails } from "../types/types";

const CustomerListScreen = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log("Fetching customers...");
        const response = await fetch("/api/customers", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Server error:", errorData);
          throw new Error(`Error ${response.status}: ${errorData}`);
        }

        const data = await response.json();
        console.log("Customer data received:", data);

        // Check if each customer has the expected fields
        data.forEach((customer: any, index: number) => {
          console.log(`Customer ${index + 1}:`, {
            id: customer.id,
            name: `${customer.firstName || "[missing]"} ${
              customer.lastName || "[missing]"
            }`,
            email: customer.email || "[missing]",
            hasName: Boolean(customer.firstName && customer.lastName),
            hasEmail: Boolean(customer.email),
          });
        });

        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

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
                  {customers.map((customer: any) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() =>
                          navigate(`/customer-details/${customer.id}`)
                        }
                      >
                        {customer.firstName} {customer.lastName}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() =>
                          navigate(`/customer-details/${customer.id}`)
                        }
                      >
                        {customer.email}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() =>
                          navigate(`/customer-details/${customer.id}`)
                        }
                      >
                        {customer.phoneNumber || "N/A"}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() =>
                          navigate(`/customer-details/${customer.id}`)
                        }
                      >
                        {customer.addresses && customer.addresses.length > 0
                          ? `${customer.addresses[0].street}, ${customer.addresses[0].city}`
                          : "N/A"}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={() =>
                          navigate(`/customer-details/${customer.id}`)
                        }
                      >
                        {customer.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString()
                          : new Date(customer.id).toLocaleDateString()}{" "}
                        {/* Fallback to ID-based date */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/customer-details/${customer.id}`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              confirm(
                                "Are you sure you want to delete this customer?"
                              )
                            ) {
                              // Add delete functionality here
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
