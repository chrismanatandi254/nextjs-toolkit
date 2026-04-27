import { NextResponse } from "next/server";

// GET /api/hello
// Returns a simple greeting message with server timestamp
export async function GET() {
  return NextResponse.json({
    message: "Hello from Next.js API Routes! 🚀",
    timestamp: new Date().toISOString(),
    version: "Next.js 16",
  });
}
