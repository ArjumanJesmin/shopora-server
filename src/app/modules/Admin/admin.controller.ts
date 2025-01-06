import { RequestHandler } from "express";
import { AdminService } from "./admin.service";

import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { adminFilterAbleFields } from "./admin.constant";
import pick from "../../../shared/pick";

// Get all data from DB
const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

// Get data by Id from DB
const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data shown successfully by Id !",
    data: result,
  });
});

// Update data into DB
const updatedIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.updatedIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin update data successfully by Id !",
    data: result,
  });
});

// Soft delete from DB
const softDeleteFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.softDeleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete data successfully by Id !",
    data: result,
  });
});

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updatedIntoDB,
  softDeleteFromDB,
};
