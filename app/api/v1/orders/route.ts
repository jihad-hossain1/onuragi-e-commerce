import connectDatabase from "@/src/config/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  try {
    await connectDatabase("E-Commerce db");
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
