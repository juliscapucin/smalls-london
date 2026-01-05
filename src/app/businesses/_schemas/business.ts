import { z } from "zod";

// Zod schemas for runtime validation
export const addBusinessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  description: z.string().min(1, "Business description is required"),
  category: z.string().min(1, "Business category is required"),
});

export const updateBusinessSchema = addBusinessSchema.partial();
