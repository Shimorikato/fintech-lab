// api.ts
import { CustomerDeails } from '../types/types';

export const submitCustomerDetails = async (customerDetails: CustomerDetails): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Submitting customer details:', customerDetails);
    
    // Clean up IDs to prevent detached entity problems
    const preparedDetails = {
      ...customerDetails,
      // Set IDs to undefined for new entities
      id: undefined,
      addresses: customerDetails.addresses?.map(addr => ({
        ...addr,
        id: undefined
      })),
      identifications: customerDetails.identifications?.map(id => ({
        ...id,
        id: undefined
      })),
      contactInformation: customerDetails.contactInformation?.map(contact => ({
        ...contact,
        id: undefined
      })),
      proofOfIdentifications: customerDetails.proofOfIdentifications?.map(proof => ({
        ...proof,
        id: undefined
      }))
    };
    
    console.log('Prepared customer details:', preparedDetails);
    
    const response = await fetch('/api/customers/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedDetails),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server error response:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries([...response.headers.entries()]));
      
      return { 
        success: false, 
        message: `Server error (${response.status}): ${errorData || 'Failed to submit customer details'}` 
      };
    }

    const data = await response.json();
    return { success: true, message: data.message || 'Customer details submitted successfully' };
  } catch (error) {
    console.error('Error submitting customer details:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export const fetchCustomers = async (): Promise<CustomerDetails[]> => {
  try {
    const response = await fetch('/api/customers');
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const deleteCustomer = async (customerId: number): Promise<{ success: boolean; message: string }> => {
  try {
    console.log(`Deleting customer with ID: ${customerId}`);
    
    const response = await fetch(`/api/customers/delete/${customerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server error response:', errorData);
      console.error('Response status:', response.status);
      
      return { 
        success: false, 
        message: `Failed to delete customer (${response.status}): ${errorData || 'Unknown error'}` 
      };
    }

    return { success: true, message: 'Customer deleted successfully' };
  } catch (error) {
    console.error('Error deleting customer:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export const updateCustomerDetails = async (
  customerId: number,
  customerDetails: CustomerDetails
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log(`Updating customer ${customerId} with details:`, customerDetails);
    
    const response = await fetch(`/api/customers/update/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerDetails),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server error response:', errorData);
      
      return { 
        success: false, 
        message: `Server error (${response.status}): ${errorData || 'Failed to update customer'}` 
      };
    }

    return { success: true, message: 'Customer updated successfully' };
  } catch (error) {
    console.error('Error updating customer:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};
