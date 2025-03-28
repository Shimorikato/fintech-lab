import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Layout from "../components/Layout";
import AuroraCard from "../components/AuroraCard";
import { motion } from "framer-motion";
import { useCustomer } from "../context/CustomerContext";

const CustomerDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>(); // Get ID from URL params if editing
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { clearCustomerDetails } = useCustomer();

  // Clear customer details when this screen is loaded for a new customer
  useEffect(() => {
    if (!id) {
      // If no ID in the URL, this is a new customer - clear the context
      clearCustomerDetails();
    }
  }, [id, clearCustomerDetails]);

  const options = [
    {
      title: "Personal Information",
      description: "Name, contact details, and address",
      icon: (
        <svg
          className="w-8 h-8 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      path: "/customer-name",
    },
    {
      title: "Identification",
      description: "Government ID and verification",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
      ),
      path: "/customer-proof-of-identity",
    },
    {
      title: "Contact Information",
      description: "Phone numbers and email addresses",
      icon: (
        <svg
          className="w-8 h-8 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      path: "/customer-contact-details",
    },
    {
      title: "Address",
      description: "Residential and mailing addresses",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      path: "/customer-address",
    },
  ];

  const handleOptionClick = (option: string, path: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <Layout title="Customer Details" backLink="/">
      <div className="max-w-4xl mx-auto">
        <AuroraCard className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-800">
            What would you like to add?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Select a category to begin entering customer information.
          </p>
        </AuroraCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {options.map((option, index) => (
            <motion.div
              key={index}
              className={`aurora-card cursor-pointer transition-all duration-300 ${
                selectedOption === option.title
                  ? "ring-2 ring-purple-500 scale-95"
                  : "hover:scale-105"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.title, option.path)}
            >
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">{option.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-800">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDetailScreen;
