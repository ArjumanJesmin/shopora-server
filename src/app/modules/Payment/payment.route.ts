import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/", PaymentController.createAmarPayPayment);

export const PaymentRoute = router;
