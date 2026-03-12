// ============================================================
// API ROUTE: /api/messages/[id]
// GET — returns a single conversation by ID
//
// TODO (students): Replace mock lookup with a real DB query.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // TODO (students): Replace with: await prisma.conversation.findUnique({ where: { id }, include: { messages: true, participants: true } })
  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === id);

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  return NextResponse.json(conversation);
}
