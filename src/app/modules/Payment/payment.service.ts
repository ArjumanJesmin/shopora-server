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

const updatePaymentStatus = async (orderId: string, status: PaymentStatus) => {
  // Check if the payment record exists
  const paymentExists = await prisma.payment.findUnique({
    where: { id: orderId },
  });

  if (!paymentExists) {
    throw new Error(`Payment record with ID ${orderId} not found.`);
  }

  // Update payment status in the database
  const payment = await prisma.payment.update({
    where: { id: orderId },
    data: { status, updatedAt: new Date() },
  });

  return payment;
};

const verifyPayment = async (orderId: string) => {
  if (!config.payment.verificationUrl || !config.payment.signatureKey) {
    throw new Error("Missing payment gateway configuration.");
  }

  const response = await axios.post(
    config.payment.verificationUrl,
    qs.stringify({
      tran_id: orderId,
      signature_key: config.payment.signatureKey,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const verificationResult = response.data;

  console.log("Payment verification result:", verificationResult);
  if (verificationResult.status === "VERIFIED") {
    await updatePaymentStatus(orderId, PaymentStatus.COMPLETED);
  }

  return verificationResult;
};

export const AmarPayService = {
  createAmarPayPayment,
  updatePaymentStatus,
  verifyPayment,
};
