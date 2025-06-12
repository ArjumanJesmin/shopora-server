import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { WishlistService } from "./wishlist.service";

const createWishlist: RequestHandler = catchAsync(async (req, res) => {
  const result = await WishlistService.createWishlist(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Wishlist created successfully!",
    data: result,
  });
});

const getAllWishlists: RequestHandler = catchAsync(async (_req, res) => {
  const result = await WishlistService.getAllWishlists();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All wishlists retrieved successfully!",
    data: result,
  });
});

const getWishlistById: RequestHandler = catchAsync(async (req, res) => {
  const result = await WishlistService.getWishlistById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist retrieved successfully!",
    data: result,
  });
});

const deleteWishlist: RequestHandler = catchAsync(async (req, res) => {
  const result = await WishlistService.deleteWishlist(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist deleted successfully!",
    data: result,
  });
});

export const WishlistController = {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  deleteWishlist,
};
