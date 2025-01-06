import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import { RequestHandler } from "express";
import { CategoryService } from "./category.service";

const createCategoryFromDB = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category data shown successfully by Id !",
    data: result,
  });
});
const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryService.getCategoryById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category data shown successfully by Id !",
    data: result,
  });
});

const updatedIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryService.updateCategory(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category update data successfully by Id !",
    data: result,
  });
});
const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryService.deleteCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category update data successfully by Id !",
    data: result,
  });
});

export const CategoryController = {
  createCategoryFromDB,
  getAllFromDB,
  getByIdFromDB,
  updatedIntoDB,
  deleteCategory,
};
