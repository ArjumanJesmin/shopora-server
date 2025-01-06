import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import pick from "../../../shared/pick";
import { Request, Response, RequestHandler } from "express";
import { IAuthUser, userFilterAbleFields } from "./user.constant";

//Create Admin
const createAdmin = catchAsync(async (req, res) => {
  const result = await UserService.createAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

//Create Customer
const createCustomer = catchAsync(async (req, res) => {
  const result = await UserService.createCustomer(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successfully!",
    data: result,
  });
});

//Create Seller
const createSeller = catchAsync(async (req, res) => {
  const result = await UserService.createSeller(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller created successfully!",
    data: result,
  });
});
//Get All Users
const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await UserService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

//Change Profile Status
const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile status change!",
    data: result,
  });
});

// Show My Profile
const getMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await UserService.getMyProfile(user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

export const UserController = {
  createAdmin,
  createCustomer,
  createSeller,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
};
