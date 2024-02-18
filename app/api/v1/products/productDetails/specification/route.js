import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    NextResponse.json({ any: "any post response" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
