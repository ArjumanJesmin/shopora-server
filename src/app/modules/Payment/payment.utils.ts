import axios from "axios";
import qs from "qs";
import { PrismaClient } from "@prisma/client";
import config from "../../../config";

const prisma = new PrismaClient();

export const initiatePayment = async (
  amount: string,
  tranId: string,
  customerDetails: { email: string }
) => {
  if (!config.store_id || !config.signature_key || !config.payment_url) {
    throw new Error("Missing configuration for payment processing.");
  }

  const data = {
    store_id: config.store_id,
    signature_key: config.signature_key,
    amount: amount,
    payment_type: "AmarPay",
    currency: "BDT",
    tran_id: tranId,
    success_url: "http://www.merchantdomain.com/successpage.html",
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancelpage.html",
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
    const response = await axios.post(config.payment_url, qs.stringify(data), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("Payment initiated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};
