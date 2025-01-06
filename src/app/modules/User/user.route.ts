import express from "express";
import { UserController } from "./user.controller";
import { Role } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/create-admin", UserController.createAdmin),
  router.post("/create-seller", UserController.createSeller);
router.post("/create-customer", UserController.createCustomer);
router.get(
  "/",
  // auth(Role.SUPER_ADMIN, Role.ADMIN),
  UserController.getAllFromDB
);
router.patch(
  "/:id",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  UserController.changeProfileStatus
);

router.get(
  "/me",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  UserController.getMyProfile
);
export const UserRoute = router;
