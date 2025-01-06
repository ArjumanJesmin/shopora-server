import { Payment, PaymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { initiatePayment } from "./payment.utils";

const createAmarPayPayment = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: {
        include: {
          customer: true,
        },
      },
      orderItems: true,
      payment: true,
      shipping: true,
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  // Access amount and customer details via the correct relations
  const paymentResponse = await initiatePayment(
    order.total.toString(),
    orderId,
    {
      name: order.user.customer?.name || "Unknown",
      phone: order.user.customer?.contactNumber || "Unknown",
      email: order.user.email,
    }
  );

  // Save payment details in the database
  const payment = await prisma.payment.create({
    data: {
      orderId,
      amount: order.total,
      transactionId: paymentResponse.tran_id,
      paymentGatewayData: paymentResponse.data,
      status: PaymentStatus.UNPAID,
    },
  });

  return payment;
};

export const AmarPayService = {
  createAmarPayPayment,
};
