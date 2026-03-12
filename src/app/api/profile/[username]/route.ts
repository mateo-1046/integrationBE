// ============================================================
// API ROUTE: /api/profile/[username]
// GET — returns profile + posts for a given username
//
// TODO (students): Replace mock lookup with real DB query.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_POSTS, CURRENT_USER, CURRENT_USER_POSTS } from "@/lib/mock-data";

// Simulate a user store — in a real app this comes from the DB
const USER_STORE: Record<string, typeof CURRENT_USER> = {
  [CURRENT_USER.username]: CURRENT_USER,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  // TODO (students): Replace with: await prisma.user.findUnique({ where: { username }, include: { posts: true } })
  const user = USER_STORE[username] ?? {
    id: `u_${username}`,
    username,
    name: username,
    avatar: `https://api.dicebear.com/8.x/notionists/svg?seed=${username}`,
    bio: "This account hasn't set up their profile yet.",
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    isVerified: false,
  };

  const posts =
    username === CURRENT_USER.username
      ? CURRENT_USER_POSTS
      : MOCK_POSTS.filter((p) => p.author.username === username);

  return NextResponse.json({ user, posts });
}
