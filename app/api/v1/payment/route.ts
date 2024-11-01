
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
   
    return NextResponse.json({ result: 'ok' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
