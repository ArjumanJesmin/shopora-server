import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OfferService } from "./offer.service";
import pick from "../../../shared/pick";
import { FilterableOfferFields } from "./offer.constant";

const createOffer: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferService.createOffer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Offer created successfully!",
    data: result,
  });
});

const getAllOffers: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, FilterableOfferFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await OfferService.getAllOffers(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offers retrieved successfully!",
    data: result,
  });
});

const getOfferById: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferService.getOfferById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offer retrieved successfully!",
    data: result,
  });
});

export const OfferController = {
  createOffer,
  getAllOffers,
  getOfferById,
};
