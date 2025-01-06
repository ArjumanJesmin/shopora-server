import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ShoppingService } from "./shipping.service";

// Create a new shipping record
const createShipping = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await ShoppingService.createShipping(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Shipping record created successfully!",
    data: result,
  });
});

// Get a single shipping record by ID
const getShippingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShoppingService.getShippingById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shipping record retrieved successfully!",
    data: result,
  });
});

// Get all shipping records (with pagination)
const getAllShippings = catchAsync(async (req: Request, res: Response) => {
  const options = {
    skip: Number(req.query.page) * Number(req.query.limit) || 0,
    limit: Number(req.query.limit) || 10,
    sortBy: req.query.sortBy || "createdAt",
    sortOrder: req.query.sortOrder || "desc",
  };

  const result = await ShoppingService.getAllShippings(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All shipping records retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

// Update a shipping record by ID
const updateShipping = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const result = await ShoppingService.updateShipping(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shipping record updated successfully!",
    data: result,
  });
});

// Delete a shipping record by ID
const deleteShipping = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShoppingService.deleteShipping(id);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Shipping record deleted successfully!",
    data: result,
  });
});
export const ShoppingController = {
  createShipping,
  getShippingById,
  getAllShippings,
  updateShipping,
  deleteShipping,
};
