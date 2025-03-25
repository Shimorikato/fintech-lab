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
  const [customerDetails, setCustomerDetails] = useState<
    Partial<CustomerDetails>
  >({
    addresses: [],
    identifications: [],
    contactInformation: [],
    proofOfIdentifications: [],
  });

  const updateCustomerName = (name: CustomerName) => {
    setCustomerDetails((prev) => ({ ...prev, ...name }));
  };

  const updateAddress = (address: Address) => {
    setCustomerDetails((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), address],
    }));
  };

  const updateIdentification = (identification: Identification) => {
    setCustomerDetails((prev) => ({
      ...prev,
      identifications: [...(prev.identifications || []), identification],
    }));
  };

  const updateContactInformation = (contactInfo: ContactInformation) => {
    setCustomerDetails((prev) => ({
      ...prev,
      contactInformation: [...(prev.contactInformation || []), contactInfo],
    }));
  };

  const updateProofOfIdentification = (proofOfId: ProofOfIdentification) => {
    setCustomerDetails((prev) => ({
      ...prev,
      proofOfIdentifications: [
        ...(prev.proofOfIdentifications || []),
        proofOfId,
      ],
    }));
  };

  const updateEmail = (email: string) => {
    setCustomerDetails((prev) => ({ ...prev, email }));
  };

  const updatePhoneNumber = (phoneNumber: string) => {
    setCustomerDetails((prev) => ({ ...prev, phoneNumber }));
  };

  const resetCustomerDetails = () => {
    setCustomerDetails({
      addresses: [],
      identifications: [],
      contactInformation: [],
      proofOfIdentifications: [],
    });
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
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
