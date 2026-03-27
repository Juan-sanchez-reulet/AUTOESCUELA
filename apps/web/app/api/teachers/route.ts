import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/availability/teachers`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ teachers: [] });
  }
}
