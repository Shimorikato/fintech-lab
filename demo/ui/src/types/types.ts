export type CustomerName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// Added enum for address types
export enum CustomerAddressType {
  Home = "Home",
  Work = "Work",
  Mailing = "Mailing"
}

export type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  customerAddressType: keyof typeof CustomerAddressType | string;
};

// Added enum for identification types
export enum IdentificationType {
  GovernmentID = "Government ID",
  Passport = "Passport",
  DriversLicense = "Drivers License"
}

export enum IdentificationItem {
  SSN = "SSN",
  PassportNumber = "PassportNumber",
  LicenseNumber = "LicenseNumber"
}

export type Identification = {
  id: number;
  customerIdentificationType: keyof typeof IdentificationType | string;
  customerIdentificationItem: keyof typeof IdentificationItem | string;
};

// Added enum for contact types
export enum ContactType {
  Mobile = "Mobile",
  Email = "Email",
  Work = "Work",
  Home = "Home"
}

export type ContactInformation = {
  id: number;
  contactType: keyof typeof ContactType | string;
  contactValue: string;
  startDate: string;
  endDate: string;
  effectiveDate: string;
};

// Added enum for proof of ID types
export enum ProofOfIDType {
  Passport = "Passport",
  DriversLicense = "Drivers License",
  GovernmentID = "Government ID"
}

export type ProofOfIdentification = {
  id: number;
  proofOfIDType: keyof typeof ProofOfIDType | string;
  proofOfIDValue: string;
  startDate: string;
  endDate: string;
  effectiveDate: string;
};

export type CustomerDetails = CustomerName & {
  id: number;
  email: string;
  phoneNumber: string;
  addresses: Address[];
  identifications: Identification[];
  contactInformation: ContactInformation[];
  proofOfIdentifications: ProofOfIdentification[];
};

// Example customer data type
export const exampleCustomerData: CustomerDetails = {
  id: 35,
  firstName: "Rohan",
  middleName: "Jaideep",
  lastName: "Sampat",
  email: "rejsdelapejs@gmail.com",
  phoneNumber: "7021445255",
  addresses: [
    {
      id: 20,
      street: "wdaw22",
      city: "mumbai",
      state: "maharastra",
      zipCode: "500054",
      country: "USA",
      customerAddressType: "Home"
    }
  ],
  identifications: [
    {
      id: 16,
      customerIdentificationType: "Government ID",
      customerIdentificationItem: "SSN"
    }
  ],
  contactInformation: [
    {
      id: 9,
      contactType: "Mobile",
      contactValue: "7045648646",
      effectiveDate: "2025-03-25",
      endDate: "2026-03-25",
      startDate: "2025-03-25"
    }
  ],
  proofOfIdentifications: [
    {
      id: 5,
      proofOfIDType: "Passport",
      proofOfIDValue: "56468",
      effectiveDate: "2025-03-25",
      startDate: "2025-03-25",
      endDate: "2035-03-25"
    }
  ]
};
