import { http, HttpResponse } from "msw";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";

export const handlers = [
  // Mock business categories - Supabase REST API format
  http.get(`${SUPABASE_URL}/rest/v1/business_categories`, ({ request }) => {
    console.log("Intercepting business_categories request");
    return HttpResponse.json(
      [
        { id: "1", name: "design", label: "Design" },
        { id: "2", name: "beauty", label: "Beauty" },
      ],
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Range": "0-1/2",
        },
      }
    );
  }),

  // Mock event categories
  http.get(`${SUPABASE_URL}/rest/v1/event_categories`, ({ request }) => {
    console.log("Intercepting event_categories request");
    return HttpResponse.json(
      [
        { id: "1", name: "music", label: "Music" },
        { id: "2", name: "art", label: "Art" },
      ],
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Range": "0-1/2",
        },
      }
    );
  }),

  // Mock auth getClaims
  http.get(`${SUPABASE_URL}/auth/v1/user`, () => {
    console.log("Intercepting auth/user request");
    return HttpResponse.json({
      aud: "authenticated",
      exp: Math.floor(Date.now() / 1000) + 3600,
      sub: null,
      email: null,
      role: "anon",
    });
  }),

  // Mock users table query with .eq() filter
  http.get(`${SUPABASE_URL}/rest/v1/users`, ({ request }) => {
    const url = new URL(request.url);
    console.log("Intercepting users request:", url.searchParams.toString());

    return HttpResponse.json([], {
      headers: {
        "Content-Type": "application/json",
        "Content-Range": "*/0",
      },
    });
  }),
];
