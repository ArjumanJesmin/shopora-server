import { RequestHandler } from "express";

import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

import pick from "../../../shared/pick";
import { CustomerService } from "./customer.service";
import { adminFilterAbleFields } from "../Admin/admin.constant";

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await CustomerService.getAllFromDB(filters, options);

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

  const result = await CustomerService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient data shown successfully by Id !",
    data: result,
  });
});

const updateCustomerData: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CustomerService.updateCustomerData(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer data Updated!",
    data: result,
  });
});

export const CustomerController = {
  getAllFromDB,
  getByIdFromDB,
  updateCustomerData,
};
