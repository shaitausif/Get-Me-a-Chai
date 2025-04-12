import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  if (process.env.NODE_ENV !== "production") {
    console.log("NextAuth _log:", body);
  }

  return NextResponse.json({ status: "ok" });
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
