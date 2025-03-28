import { createContext, useContext, useState, ReactNode } from "react";
import {
  CustomerDetails,
  CustomerName,
  Address,
  Identification,
  ContactInformation,
  ProofOfIdentification,
} from "../types/types";

type CustomerContextType = {
  customerDetails: Partial<CustomerDetails>;
  updateCustomerName: (name: CustomerName) => void;
  updateAddress: (address: Address) => void;
  updateIdentification: (identification: Identification) => void;
  updateContactInformation: (contactInfo: ContactInformation) => void;
  updateProofOfIdentification: (proofOfId: ProofOfIdentification) => void;
  updateEmail: (email: string) => void;
  updatePhoneNumber: (phoneNumber: string) => void;
  resetCustomerDetails: () => void;
  setCustomerDetails: (customer: Partial<CustomerDetails>) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  clearCustomerDetails: () => void; // New method to clear the context
};

const initialCustomerDetails: CustomerDetails = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  addresses: [],
  identifications: [],
  contactInformation: [],
  proofOfIdentifications: [],
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customerDetails, setCustomerDetailsState] = useState<
    Partial<CustomerDetails>
  >(initialCustomerDetails);

  const [isEditing, setIsEditing] = useState(false);

  const setCustomerDetails = (customer: Partial<CustomerDetails>) => {
    if (customer.id) {
      setIsEditing(true);
      window.sessionStorage.setItem("customerId", customer.id.toString());
    }

    const customerWithArrays = {
      ...customer,
      addresses: customer.addresses || [],
      identifications: customer.identifications || [],
      contactInformation: customer.contactInformation || [],
      proofOfIdentifications: customer.proofOfIdentifications || [],
    };
    setCustomerDetailsState(customerWithArrays);
  };

  const updateCustomerName = (name: CustomerName) => {
    setCustomerDetailsState((prev) => ({ ...prev, ...name }));
  };

  const updateAddress = (address: Address) => {
    setCustomerDetailsState((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), address],
    }));
  };

  const updateIdentification = (identification: Identification) => {
    setCustomerDetailsState((prev) => ({
      ...prev,
      identifications: [...(prev.identifications || []), identification],
    }));
  };

  const updateContactInformation = (contactInfo: ContactInformation) => {
    setCustomerDetailsState((prev) => ({
      ...prev,
      contactInformation: [...(prev.contactInformation || []), contactInfo],
    }));
  };

  const updateProofOfIdentification = (proofOfId: ProofOfIdentification) => {
    setCustomerDetailsState((prev) => ({
      ...prev,
      proofOfIdentifications: [
        ...(prev.proofOfIdentifications || []),
        proofOfId,
      ],
    }));
  };

  const updateEmail = (email: string) => {
    setCustomerDetailsState((prev) => ({ ...prev, email }));
  };

  const updatePhoneNumber = (phoneNumber: string) => {
    setCustomerDetailsState((prev) => ({ ...prev, phoneNumber }));
  };

  const resetCustomerDetails = () => {
    setCustomerDetailsState(initialCustomerDetails);
  };

  const clearCustomerDetails = () => {
    setCustomerDetailsState(initialCustomerDetails);
    window.sessionStorage.removeItem("customerId");
  };

  return (
    <CustomerContext.Provider
      value={{
        customerDetails,
        updateCustomerName,
        updateAddress,
        updateIdentification,
        updateContactInformation,
        updateProofOfIdentification,
        updateEmail,
        updatePhoneNumber,
        resetCustomerDetails,
        setCustomerDetails,
        isEditing,
        setIsEditing,
        clearCustomerDetails,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
