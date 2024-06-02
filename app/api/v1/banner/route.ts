import { fieldValidate, validateImage } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Banner from "@/src/models/banner.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, image, productId } = await request.json();

  try {
    fieldValidate(title, "Title");
    fieldValidate(productId, "product");
    validateImage(image);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    await connectDatabase("banner");

    const banner = await Banner.findOne({ productId });
    if (banner) {
      return NextResponse.json(
        { error: "Banner already exists for this product." },
        { status: 400 }
      );
    }

    const newBanner = new Banner({
      title,
      image,
      productId,
    });

    const savedBanner = await newBanner.save();

    return NextResponse.json(
      { message: "ok.", result: savedBanner },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDatabase("banner");
    const banner = await Banner.find();
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
