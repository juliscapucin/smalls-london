import { z } from "zod";

// Zod schemas for runtime validation
export const createBusinessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  description: z.string().min(1, "Business description is required"),
});

export const updateBusinessSchema = createBusinessSchema.partial();
