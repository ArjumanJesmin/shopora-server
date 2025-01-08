import express from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validation";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllFromDB);
router.get("/:id", OrderController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(OrderValidation.updateOrderSchema),
  OrderController.updateOrderData
);
router.delete("/:id", OrderController.deleteOrderData);

export const OrderRoutes = router;
