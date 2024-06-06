import { fieldValidate, validateImage } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import OfferBanner from "@/src/models/offerbanner.model";
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

    await connectDatabase("offer banner");

    const offerBanner = await OfferBanner.findOne({ productId });
    if (offerBanner) {
      return NextResponse.json(
        { error: "offer banner already exists for this product." },
        { status: 400 }
      );
    }

    const newOfferBanner = new OfferBanner({
      title,
      image,
      productId,
    });

    const result = await newOfferBanner.save();

    return NextResponse.json(
      { message: "ok.", result: result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDatabase("offer banner");
    const offerBanner = (await OfferBanner.find()).reverse();
    return NextResponse.json(offerBanner);
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
