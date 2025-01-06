import { RequestHandler } from "express";
import { ProfileService } from "./profile.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

// Create Profile
const createProfile: RequestHandler = catchAsync(async (req, res) => {
  const { bio, userId } = req.body;
  const profile = await ProfileService.createProfile(bio, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile created successfully!",
    data: profile,
  });
});

// Get Profile by ID
const getProfile: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const profile = await ProfileService.getProfileById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully!",
    data: profile,
  });
});

// Update Profile by ID
const updateProfile: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;
  const profile = await ProfileService.updateProfile(id, bio);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully!",
    data: profile,
  });
});

// Delete Profile by ID
const deleteProfile: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProfileService.deleteProfile(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile deleted successfully!",
    data: result,
  });
});

// Export Profile Controller
export const ProfileController = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
