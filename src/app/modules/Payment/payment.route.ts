import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

// Create a new payment
router.post("/create", PaymentController.createAmarPayPayment);

// Update payment status
router.patch("/update-status", PaymentController.updatePaymentStatus);

// Verify a payment
router.post("/verify", PaymentController.verifyPayment);

export const PaymentRoute = router;
