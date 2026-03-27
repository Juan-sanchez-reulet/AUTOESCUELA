import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    const [mockRes, liveRes] = await Promise.all([
      fetch(`${API_URL}/conversations`),
      fetch(`${API_URL}/chat/sessions`),
    ]);
    const mock = await mockRes.json();
    const live = await liveRes.json();

    // Mezclar conversaciones mock + sesiones vivas del chat
    const liveSessions = (live.sessions || []).map((s: {session_id: string; preview: string; message_count: number; last_message: string; last_role: string}) => ({
      id: s.session_id,
      session_id: s.session_id,
      business_id: "autoescuela-madrid-centro",
      created_at: new Date().toISOString(),
      preview: s.preview,
      message_count: s.message_count,
      last_message: s.last_message,
      last_role: s.last_role,
      isLive: true,
    }));

    const all = [...liveSessions, ...(mock.conversations || [])];
    return NextResponse.json({ conversations: all });
  } catch {
    return NextResponse.json({ conversations: [] });
  }
}
