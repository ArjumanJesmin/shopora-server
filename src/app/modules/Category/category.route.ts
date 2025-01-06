import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post("/", CategoryController.createCategoryFromDB);
router.get("/", CategoryController.getAllFromDB);
router.get("/:id", CategoryController.getByIdFromDB);
router.patch("/:id", CategoryController.updatedIntoDB);
router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoute = router;
