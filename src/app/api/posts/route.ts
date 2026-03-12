// ============================================================
// API ROUTE: /api/posts
// GET  — returns all posts
// POST — creates a new post
//
// TODO (students): This route uses in-memory mock data.
//   Replace the imports and logic below with real database
//   queries (e.g., Prisma, Drizzle, Supabase, etc.).
//   The request/response shape should stay the same so the
//   frontend keeps working without changes.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_POSTS, CURRENT_USER } from "@/lib/mock-data";
import { CreatePostPayload } from "@/lib/types";

export async function GET() {
  // TODO (students): Replace with a real DB query
  // Example with Prisma:
  //   const posts = await prisma.post.findMany({ include: { author: true, comments: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(MOCK_POSTS);
}

export async function POST(req: NextRequest) {
  const body: CreatePostPayload = await req.json();

  // Basic validation
  if (!body.imageUrl || !body.caption) {
    return NextResponse.json(
      { error: "imageUrl and caption are required" },
      { status: 400 }
    );
  }

  // TODO (students): Replace with a real DB insert
  // Example with Prisma:
  //   const post = await prisma.post.create({ data: { ...body, authorId: session.user.id } });
  const newPost = {
    id: `post_${Date.now()}`,
    author: CURRENT_USER,
    imageUrl: body.imageUrl,
    caption: body.caption,
    location: body.location,
    likesCount: 0,
    commentsCount: 0,
    createdAt: new Date().toISOString(),
    comments: [],
    isLiked: false,
    isSaved: false,
  };

  // Persist to in-memory store (resets on server restart)
  MOCK_POSTS.unshift(newPost);

  return NextResponse.json(newPost, { status: 201 });
}
