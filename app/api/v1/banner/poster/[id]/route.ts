import connectDatabase from "@/src/config/mongodbConnection";
import Poster from "@/src/models/poster.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  try {
    await connectDatabase("poster");
    const poster = await Poster.findById(params.id);

    if (!poster) {
      return NextResponse.json({ error: "poster not found." }, { status: 404 });
    }
    return NextResponse.json({ result: poster }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    await connectDatabase("poster");
    const poster = await Poster.findByIdAndDelete(params.id);
    return NextResponse.json(poster);
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }) {
  const { title, image, productId } = await req.json();
  try {
    await connectDatabase("poster");

    const poster = await Poster.findByIdAndUpdate(
      params.id,
      {
        $set: {
          title: title || undefined,
          image: image || undefined,
          productId: productId || undefined,
        },
      },
      { new: true }
    );

    if (!poster) {
      return NextResponse.json({ error: "poster not found." }, { status: 404 });
    }

    return NextResponse.json({ result: poster }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
