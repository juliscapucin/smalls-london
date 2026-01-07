import type { Tables } from "@/services/supabase/types/database";

import { z } from "zod";
import { addBusinessSchema, updateBusinessSchema } from "../_schemas/business";

// For displaying data from database
export type Business = Tables<"businesses">;

// Form submission types (inferred types from schemas)
export type AddBusiness = z.infer<typeof addBusinessSchema>;

export type UpdateBusiness = z.infer<typeof updateBusinessSchema>;
