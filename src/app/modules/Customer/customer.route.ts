import express from "express";
import { CustomerController } from "./customer.controller";

const router = express.Router();

router.get("/", CustomerController.getAllFromDB);
router.get("/:id", CustomerController.getByIdFromDB);
router.patch("/:id", CustomerController.updateCustomerData);

export const CustomerRoutes = router;
