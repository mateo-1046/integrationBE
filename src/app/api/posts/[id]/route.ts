import { NextRequest, NextResponse } from "next/server";
import { MOCK_REELS } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const reels = MOCK_REELS.find((p) => p.author.name === id);

  if (!reels) {
    return NextResponse.json({ error: "reels not found" }, { status: 404 });
  }

  reels.isLiked = !reels.isLiked;
  reels.likesCount += reels.isLiked ? 1 : -1;

  return NextResponse.json({ isLiked: reels.isLiked, likesCount: reels.likesCount });
}
