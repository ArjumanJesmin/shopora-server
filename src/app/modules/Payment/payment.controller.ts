import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AmarPayService } from "./payment.service";

const createAmarPayPayment = catchAsync(async (req, res) => {
  const { orderId } = req.body;
  const result = await AmarPayService.createAmarPayPayment(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

export const PaymentController = {
  createAmarPayPayment,
};
