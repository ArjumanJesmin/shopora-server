export interface AdminPayload {
  password: string;
  admin: {
    name: string;
    email: string;
    contactNumber: string;
  };
}

export interface CustomerPayload {
  password: string;
  customer: {
    name: string;
    email: string;
    contactNumber: string;
  };
}

export interface SellerPayload {
  password: string;
  seller: {
    name: string;
    email: string;
    contactNumber: string;
    storeName: string;
  };
}
