// ============================================================
// API ROUTE: /api/posts/[id]/like
// POST — toggles like on a post
//
// TODO (students): Replace mock logic with real DB toggle.
//   Also add auth check: only authenticated users can like.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_POSTS } from "@/lib/mock-data";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // TODO (students): Replace with real DB upsert/delete on a Likes table
  // Example: await prisma.like.upsert({ where: { postId_userId: { postId: id, userId: session.user.id } }, ... })
  const post = MOCK_POSTS.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  post.isLiked = !post.isLiked;
  post.likesCount += post.isLiked ? 1 : -1;

  return NextResponse.json({ isLiked: post.isLiked, likesCount: post.likesCount });
}
