export interface AddressPayload {
  userId: string;
  type?: "SHIPPING" | "BILLING";
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
