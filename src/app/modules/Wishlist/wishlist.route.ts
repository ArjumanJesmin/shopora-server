import express from "express";
import { WishlistController } from "./wishlist.controller";

const router = express.Router();

router.post("/", WishlistController.createWishlist);
router.get("/", WishlistController.getAllWishlists);
router.get("/:id", WishlistController.getWishlistById);
router.delete("/:id", WishlistController.deleteWishlist);

export const WishlistRoutes = router;
