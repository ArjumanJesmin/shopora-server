import { RequestHandler } from "express";

import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

import pick from "../../../shared/pick";

import { OrderItemService } from "./orderItem.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderItemService.createOrderItem(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await OrderItemService.getAllOrderItems(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Item data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderItemService.getOrderItemById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Item data shown successfully by Id !",
    data: result,
  });
});

const updateOrderData: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderItemService.updateOrderItem(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Item data Updated!",
    data: result,
  });
});
const deleteOrderData: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderItemService.deleteOrderItem(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Item data Updated!",
    data: result,
  });
});

export const OrderItemController = {
  createOrder,
  getAllFromDB,
  getByIdFromDB,
  updateOrderData,
  deleteOrderData,
};
