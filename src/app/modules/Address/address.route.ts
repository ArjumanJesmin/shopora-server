import { Router } from "express";
import { AddressController } from "./address.controller";

const router = Router();

router.get("/", AddressController.getAllAddresses);
router.get("/:id", AddressController.getAddressById);
router.post("/", AddressController.createAddress);
router.patch("/:id", AddressController.updateAddress);
router.delete("/:id", AddressController.deleteAddress);

export const UserAddressRoutes = router;
