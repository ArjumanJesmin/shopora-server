import express from "express";
import { FlashSaleController } from "./flashSale.controller";

const router = express.Router();

router.get("/", FlashSaleController.getAllFromDB);
router.get("/:id", FlashSaleController.getByIdFromDB);
router.post("/", FlashSaleController.createFlashSale);

router.patch("/:id", FlashSaleController.updateFlashSale);
router.delete("/:id", FlashSaleController.deleteFlashSale);

export const FlashSaleRoutes = router;
