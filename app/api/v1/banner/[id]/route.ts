import connectDatabase from "@/src/config/mongodbConnection";
import Banner from "@/src/models/banner.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  try {
    await connectDatabase("banner");
    const banner = await Banner.findById(params.id);

    if (!banner) {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }
    return NextResponse.json({ result: banner }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    await connectDatabase("banner");
    const banner = await Banner.findByIdAndDelete(params.id);
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }) {
  const { title, image, productId } = await req.json();
  try {
    await connectDatabase("banner");

    const banner = await Banner.findByIdAndUpdate(
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

    if (!banner) {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }

    return NextResponse.json({ result: banner }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
