import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";

import { ReportService } from "./report.service";
import { adminFilterAbleFields } from "../Admin/admin.constant";

// This controller handles report-related requests
const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await ReportService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report data fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

// This controller fetches a report by its ID
const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReportService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report data fetched by ID successfully!",
    data: result,
  });
});

// This controller creates a new report
const createReport: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReportService.createReport(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Report created successfully!",
    data: result,
  });
});

export const ReportController = {
  getAllFromDB,
  getByIdFromDB,
  createReport,
};
