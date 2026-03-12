// ============================================================
// API ROUTE: /api/posts/[id]
// GET — returns a single post by ID
//
// TODO (students): Replace mock lookup with a real DB query.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_POSTS } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // TODO (students): Replace with: await prisma.post.findUnique({ where: { id } })
  const post = MOCK_POSTS.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
