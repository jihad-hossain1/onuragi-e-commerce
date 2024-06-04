import { fieldValidate, validateImage } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Poster from "@/src/models/poster.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, image, productId } = await req.json();

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

    await connectDatabase("poster");

    const poster = await Poster.findOne({ productId });
    if (poster) {
      return NextResponse.json(
        { error: "poster already exists for this product." },
        { status: 400 }
      );
    }

    const newPoster = new Poster({
      title,
      image,
      productId,
    });

    const savedPoster = await newPoster.save();

    return NextResponse.json(
      { message: "ok.", result: savedPoster },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDatabase("poster");
    const poster = (await Poster.find()).reverse();
    return NextResponse.json(poster);
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
