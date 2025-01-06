import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllFromDB);
router.get("/:id", OrderController.getByIdFromDB);
router.patch("/:id", OrderController.updateOrderData);
router.delete("/:id", OrderController.deleteOrderData);

export const OrderRoutes = router;
