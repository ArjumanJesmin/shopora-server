import { PaymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { initiatePayment } from "./payment.utils";
import axios from "axios";
import config from "../../../config";
import qs from "qs";

const createAmarPayPayment = async (orderId: string) => {
  if (!orderId) {
    throw new Error("Order ID is required.");
  }
  const order = await prisma.order.findFirstOrThrow({
    where: { id: orderId },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      payment: true,
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  // Check if a payment already exists for the order
  if (order.paymentStatus !== PaymentStatus.PENDING) {
    throw new Error("Payment already exists for this order.");
  }

  // Extract amount and customer details
  const paymentResponse = await initiatePayment(
    order.totalAmount.toString(),
    orderId,
    {
      email: order.user.email || "Unknown",
    }
  );

  // Save payment details in the database
  const payment = await prisma.payment.create({
    data: {
      orderId,
      amount: order.totalAmount,
      status: PaymentStatus.COMPLETED,
    },
  });

  console.log("Payment saved successfully:", payment);

  return payment;
};

const updatePaymentStatus = async (
  transactionId: string,
  status: PaymentStatus
) => {
  const payment = await prisma.payment.update({
    where: { id: transactionId },
    data: { status, updatedAt: new Date() },
  });

  console.log("Payment status updated:", payment);
  return payment;
};

const verifyPayment = async (transactionId: string) => {
  if (!config.signature_key) {
    throw new Error("Missing configuration for payment verification.");
  }

  try {
    const response = await axios.post(
      config.signature_key,
      qs.stringify({
        tran_id: transactionId,
        signature_key: config.signature_key,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("Payment verification response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

export const AmarPayService = {
  createAmarPayPayment,
  updatePaymentStatus,
  verifyPayment,
};
