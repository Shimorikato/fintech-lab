import { useState } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout';
import AuroraCard from '../components/AuroraCard';
import FormProgress from '../components/FormProgress';
import { motion } from 'framer-motion';
import { useCustomer } from '../context/CustomerContext';
import { CustomerName } from '../types/types';

const CustomerNameScreen = () => {
  const navigate = useNavigate();
  const { updateCustomerName, customerDetails } = useCustomer();
  const [formData, setFormData] = useState<CustomerName>({
    firstName: customerDetails.firstName || '',
    middleName: customerDetails.middleName || '',
    lastName: customerDetails.lastName || '',
  });
  const [errors, setErrors] = useState<Partial<CustomerName>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof CustomerName]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerName> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateCustomerName(formData);
      navigate('/customer-proof-of-identity');
    }
  };

  return (
    <Layout title="Customer Name" backLink="/customer-details">
      <div className="max-w-2xl mx-auto">
        <FormProgress steps={4} currentStep={0} />
        
        <AuroraCard>
          <h2 className="text-2xl font-semibold mb-6 dark:text-white text-gray-800">
            Customer Name Information
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Middle Name <span className="text-gray-500">(optional)</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter middle name"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
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

export default CustomerNameScreen;
