import express from "express";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", ReviewController.createReview);
router.get("/", ReviewController.getAllFromDB);
router.get("/:id", ReviewController.getByIdFromDB);

export const ReviewRoutes = router;
