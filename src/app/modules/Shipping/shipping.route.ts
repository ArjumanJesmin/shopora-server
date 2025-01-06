import express from "express";
import { ShoppingController } from "./shipping.controller";
const router = express.Router();

router.post("/", ShoppingController.createShipping);

router.get("/:id", ShoppingController.getShippingById);

router.get("/", ShoppingController.getAllShippings);

router.patch("/:id", ShoppingController.updateShipping);

router.delete("/:id", ShoppingController.deleteShipping);

export const ShoppingRoute = router;
