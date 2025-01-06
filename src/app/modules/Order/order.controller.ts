import { RequestHandler } from "express";

import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

import pick from "../../../shared/pick";

import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await OrderService.getAllOrders(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderService.getOrderByID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient data shown successfully by Id !",
    data: result,
  });
});

const updateOrderData: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderService.updateOrder(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order data Updated!",
    data: result,
  });
});
const deleteOrderData: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderService.deleteOrder(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order data Updated!",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllFromDB,
  getByIdFromDB,
  updateOrderData,
  deleteOrderData,
};
