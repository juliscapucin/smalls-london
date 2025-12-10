import { z } from "zod";

export const businessSchema = z.object({
  id: z.string().uuid().optional(),
  business_name: z.string().min(1, "Business name is required"),
  description: z.string().min(1, "Business description is required"),
});

export type Business = z.infer<typeof businessSchema>;

export const insertBusinessSchema = businessSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;

export const updateBusinessSchema = insertBusinessSchema.partial();

export type UpdateBusiness = z.infer<typeof updateBusinessSchema>;
