import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AddressService } from "./address.service";
import pick from "../../../shared/pick";
import { Request, Response, RequestHandler } from "express";
import { FilterAbleFields } from "./address.constant";

// Create Address
const createAddress = catchAsync(async (req: Request, res: Response) => {
  const result = await AddressService.createAddress(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address created successfully!",
    data: result,
  });
});

// Update Address
const updateAddress = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AddressService.updateAddress(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address updated successfully!",
    data: result,
  });
});

// Get All Addresses
const getAllAddresses: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, FilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AddressService.getAllAddresses(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Addresses fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

// Get Address by ID
const getAddressById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AddressService.getAddressById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address fetched successfully!",
    data: result,
  });
});

// Delete Address
const deleteAddress = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AddressService.deleteAddress(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address deleted successfully!",
    data: result,
  });
});

export const AddressController = {
  createAddress,
  updateAddress,
  getAllAddresses,
  getAddressById,
  deleteAddress,
};
