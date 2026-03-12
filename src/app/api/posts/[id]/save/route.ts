// ============================================================
// API ROUTE: /api/posts/[id]/save
// POST — toggles saved state on a post
//
// TODO (students): Replace mock logic with real DB toggle.
//   Also add auth check: only authenticated users can save.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_POSTS } from "@/lib/mock-data";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // TODO (students): Replace with real DB upsert/delete on a SavedPosts table
  const post = MOCK_POSTS.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  post.isSaved = !post.isSaved;

  return NextResponse.json({ isSaved: post.isSaved });
}
