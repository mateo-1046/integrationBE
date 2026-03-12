// ============================================================
// API ROUTE: /api/profile
// POST — update the current user's profile
//
// TODO (students): Add authentication. Only the logged-in
//   user should be able to update their own profile.
//   Replace mock mutation with a real DB update.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { CURRENT_USER } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  const body: { name?: string; bio?: string; website?: string; avatarUrl?: string } =
    await req.json();

  // TODO (students): Replace with:
  //   await prisma.user.update({ where: { id: session.user.id }, data: body })
  // NOTE: If updating avatar, the client should upload the image with UploadThing
  //   first and send the resulting URL as avatarUrl.

  if (body.name) CURRENT_USER.name = body.name;
  if (body.bio) CURRENT_USER.bio = body.bio;
  if (body.website !== undefined) CURRENT_USER.website = body.website;
  if (body.avatarUrl) CURRENT_USER.avatar = body.avatarUrl;

  return NextResponse.json(CURRENT_USER);
}
