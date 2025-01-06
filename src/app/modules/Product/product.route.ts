import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/", ProductController.createProductFromDB);
router.get("/", ProductController.getAllFromDB);
router.get("/:id", ProductController.getByIdFromDB);
router.patch("/:id", ProductController.updatedIntoDB);
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoute = router;
