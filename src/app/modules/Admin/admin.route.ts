import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get("/:id", AdminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminController.updatedIntoDB
);
router.delete("/soft/:id", AdminController.softDeleteFromDB);
router.get("/", AdminController.getAllFromDB);

export const AdminRoutes = router;
