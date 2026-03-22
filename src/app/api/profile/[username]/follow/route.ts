import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/mock-data";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const user = MOCK_USERS.find((u) => u.username === username);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

 
  user.followersCount += 1;

  return NextResponse.json({
    followersCount: user.followersCount,
  });
}