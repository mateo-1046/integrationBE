// ============================================================
// API ROUTE: /api/messages
// GET  — returns all conversations for the current user
// POST — sends a new message in an existing conversation
//
// TODO (students): Replace mock data with real DB queries.
//   For real auth, identify the current user from the session.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_CONVERSATIONS, CURRENT_USER } from "@/lib/mock-data";
import { SendMessagePayload } from "@/lib/types";

export async function GET() {
  // TODO (students): Replace with:
  //   await prisma.conversation.findMany({ where: { participants: { some: { id: session.user.id } } }, include: { messages: true, participants: true } })
  return NextResponse.json(MOCK_CONVERSATIONS);
}

export async function POST(req: NextRequest) {
  const body: SendMessagePayload = await req.json();

  if (!body.conversationId || !body.text) {
    return NextResponse.json(
      { error: "conversationId and text are required" },
      { status: 400 }
    );
  }

  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === body.conversationId);

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  // TODO (students): Replace with: await prisma.message.create({ data: { conversationId, senderId: session.user.id, text } })
  const newMessage = {
    id: `msg_${Date.now()}`,
    senderId: CURRENT_USER.id,
    text: body.text,
    mediaUrl: body.mediaUrl,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  conversation.messages.push(newMessage);
  conversation.lastMessage = newMessage;

  return NextResponse.json(conversation, { status: 201 });
}
