import type { Tables } from "@/services/supabase/types/database";

import { z } from "zod";
import {
  createBusinessSchema,
  updateBusinessSchema,
} from "../_schemas/business";

// For displaying data from database
export type Business = Tables<"businesses">;

// Form submission types (inferred types from schemas)
export type CreateBusiness = z.infer<typeof createBusinessSchema>;

export type UpdateBusiness = z.infer<typeof updateBusinessSchema>;
