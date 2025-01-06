import { z } from "zod";

const update = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name must be at least 1 character long.")
      .optional(),
    contactNumber: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Contact number must be between 10-15 digits.")
      .optional(),
  }),
});

export const adminValidationSchemas = {
  update,
};
