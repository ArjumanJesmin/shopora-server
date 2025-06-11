import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AmarPayService } from "./payment.service";
import { PaymentStatus } from "@prisma/client";

const createAmarPayPayment = catchAsync(async (req, res) => {
  const { orderId } = req.body;

  const result = await AmarPayService.createAmarPayPayment(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment created successfully!",
    data: result,
  });
});

const updatePaymentStatus = catchAsync(async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status || !Object.values(PaymentStatus).includes(status)) {
    throw new Error("Invalid input data for updating payment status.");
  }

  const result = await AmarPayService.updatePaymentStatus(orderId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment status updated successfully!",
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const { orderId } = req.body;

  const result = await AmarPayService.verifyPayment(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment verified successfully!",
    data: result,
  });
});

export const PaymentController = {
  createAmarPayPayment,
  updatePaymentStatus,
  verifyPayment,
};
