import express from "express";
import { OrderItemController } from "./orderItem.controller";

const router = express.Router();

router.post("/", OrderItemController.createOrder);

router.get("/", OrderItemController.getAllFromDB);

router.get("/:id", OrderItemController.getByIdFromDB);

router.patch("/:id", OrderItemController.updateOrderData);

router.delete("/:id", OrderItemController.deleteOrderData);

export const OrderItemRoute = router;
