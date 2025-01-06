import axios from "axios";
import config from "../../../config";
import qs from "qs";

export const initiatePayment = async (
  amount: string,
  tranId: string,
  customerDetails: { name: string; phone: string; email: string }
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
    customer_name: customerDetails.name,
    customer_phone: customerDetails.phone,
    customer_email: customerDetails.email,
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
