import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";

import { FlashSaleService } from "./flashSale.service";

const flashSaleFilterableFields = ["searchTerm", "productId"];

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, flashSaleFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await FlashSaleService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flash sales fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FlashSaleService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flash sale fetched by ID successfully!",
    data: result,
  });
});

const createFlashSale: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await FlashSaleService.createFlashSale({
    productId: payload.productId,
    discount: payload.discount,
    startAt: new Date(payload.startAt),
    endAt: new Date(payload.endAt),
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Flash sale created successfully!",
    data: result,
  });
});

const updateFlashSale: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await FlashSaleService.updateFlashSale(id, {
    discount: payload.discount,
    startAt: payload.startAt ? new Date(payload.startAt) : undefined,
    endAt: payload.endAt ? new Date(payload.endAt) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flash sale updated successfully!",
    data: result,
  });
});

const deleteFlashSale: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  await FlashSaleService.deleteFlashSale(id);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Flash sale deleted successfully!",
    data: null,
  });
});

export const FlashSaleController = {
  getAllFromDB,
  getByIdFromDB,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale,
};
