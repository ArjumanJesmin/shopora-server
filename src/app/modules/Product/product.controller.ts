import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import { RequestHandler } from "express";
import { ProductService } from "./product.service";
import pick from "../../../shared/pick";
import { FilterAbleFields } from "./product.constant";
// Create Product
const createProductFromDB = catchAsync(async (req, res) => {
  const result = await ProductService.createProductFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});
// Get All Products
const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, FilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ProductService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product data shown successfully by Id !",
    data: result,
  });
});
// Get Product by ID
const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductService.getProductById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product data shown successfully by Id !",
    data: result,
  });
});

// Update Product
const updatedIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductService.updateProduct(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product update data successfully by Id !",
    data: result,
  });
});

// Delete Product
const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductService.deleteProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product update data successfully by Id !",
    data: result,
  });
});

export const ProductController = {
  createProductFromDB,
  getAllFromDB,
  getByIdFromDB,
  updatedIntoDB,
  deleteProduct,
};
