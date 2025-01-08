import { z } from "zod";

const updateOrderSchema = z.object({
  productIds: z.array(z.string()).optional(),
  totalAmount: z.number().positive().optional(),
  status: z
    .enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"])
    .optional(),
  paymentStatus: z.enum(["PENDING", "COMPLETED", "REFUNDED"]).optional(),
});

export const OrderValidation = {
  updateOrderSchema,
};
