import express from "express";
import { OfferController } from "./offer.controller";

const router = express.Router();

router.post("/", OfferController.createOffer);
router.get("/", OfferController.getAllOffers);
router.get("/:id", OfferController.getOfferById);

export const OfferRoutes = router;
