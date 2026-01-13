import { http, HttpResponse } from "msw";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";

export const handlers = [
  // Mock business categories
  http.get(`${SUPABASE_URL}/rest/v1/business_categories`, () => {
    return HttpResponse.json([
      { id: 1, name: "design", label: "Design" },
      { id: 2, name: "beauty", label: "Beauty" },
    ]);
  }),

  // Mock event categories
  http.get(`${SUPABASE_URL}/rest/v1/event_categories`, () => {
    return HttpResponse.json([
      { id: 1, name: "music", label: "Music" },
      { id: 2, name: "art", label: "Art" },
    ]);
  }),

  // Mock auth user
  http.get(`${SUPABASE_URL}/auth/v1/user`, () => {
    return HttpResponse.json(null);
  }),
];
