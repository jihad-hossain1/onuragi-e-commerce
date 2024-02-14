import { NextResponse } from "next/server";

async function handler(req, res) {
  return NextResponse.json({ message: "welcome to arena" });
}

export { handler as GET };
