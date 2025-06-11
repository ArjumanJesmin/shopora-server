import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
const router = express.Router();
router.post(
  "/login",
  // auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  AuthController.loginUser
);
router.post(
  "/refresh-token",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  AuthController.refreshToken
);
router.post(
  "/change-password",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  AuthController.changePassword
);
router.post(
  "/reset-password",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  AuthController.resetPassword
);

export const AuthRoutes = router;
