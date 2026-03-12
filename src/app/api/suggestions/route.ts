// ============================================================
// API ROUTE: /api/suggestions
// GET — returns suggested users for the current user
//
// TODO (students): This route uses in-memory mock data.
//   Replace the imports and logic below with real database
//   queries (e.g., Prisma, Drizzle, Supabase, etc.).
//   A real implementation would exclude users the current
//   user already follows and apply a recommendation algorithm.
// ============================================================

import { NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/mock-data";

export async function GET() {
  // TODO (students): Replace with a real DB query
  // Example with Prisma:
  //   const suggestions = await prisma.user.findMany({
  //     where: { NOT: { followers: { some: { followerId: session.user.id } } } },
  //     take: 5,
  //   });
  return NextResponse.json(MOCK_USERS.slice(0, 5));
}
