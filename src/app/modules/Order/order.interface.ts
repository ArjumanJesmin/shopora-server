export type TOrder = {
  total: number;
  userId: string;
  orderItems: {
    productId: string;
    quantity: number;
  }[];
  payment?: string;
  shipping?: string;
};

export type TOrderData = {
  total?: number;
  orderItems?: {
    productId: string;
    quantity: number;
  }[];
  paymentId?: string;
  shippingId?: string;
};
