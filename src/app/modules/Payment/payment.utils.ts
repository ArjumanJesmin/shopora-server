import axios from "axios";
import qs from "qs";
import { PrismaClient } from "@prisma/client";
import config from "../../../config";

export const initiatePayment = async (
  amount: string,
  tranId: string,
  customerDetails: { email: string }
) => {
  const { payment } = config;

  if (!payment.storeId || !payment.signatureKey || !payment.paymentUrl) {
    throw new Error("Missing configuration for payment processing.");
  }

  const data = {
    store_id: payment.storeId,
    signature_key: payment.signatureKey,
    amount,
    payment_type: "AmarPay",
    currency: "BDT",
    tran_id: tranId,
    success_url: payment.successUrl,
    fail_url: payment.failUrl,
    cancel_url: payment.cancelUrl,
    customer_email: customerDetails.email,
    desc: "Merchant Registration Payment",
    cus_email: customerDetails.email,
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: "+8801704",
    type: "json",
  };

  try {
    const response = await axios.post(payment.paymentUrl, qs.stringify(data), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("Payment initiated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};
