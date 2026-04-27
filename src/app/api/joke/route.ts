import { NextResponse } from "next/server";

// GET /api/joke
// Fetches a random dad joke from the icanhazdadjoke public API
// Demonstrates calling an external API from a Next.js route handler
export async function GET() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
        "User-Agent": "NextJS Beginner Toolkit (learning project)",
      },
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      joke: data.joke,
      id: data.id,
      source: "icanhazdadjoke.com",
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Always handle errors gracefully in API routes
    return NextResponse.json(
      { error: "Failed to fetch joke. Please try again." },
      { status: 500 }
    );
  }
}
