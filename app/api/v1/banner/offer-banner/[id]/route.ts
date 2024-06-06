import connectDatabase from "@/src/config/mongodbConnection";
import OfferBanner from "@/src/models/offerbanner.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  try {
    await connectDatabase("offer banner");
    const offerBanner = await OfferBanner.findById(params.id);

    if (!offerBanner) {
      return NextResponse.json(
        { error: "Offer Banner not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ result: offerBanner }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    await connectDatabase("offerBanner");
    const offerBanner = await OfferBanner.findByIdAndDelete(params.id);
    return NextResponse.json(offerBanner);
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }) {
  const { title, image, productId } = await req.json();
  try {
    await connectDatabase("offer Banner");

    const offerBanner = await OfferBanner.findByIdAndUpdate(
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

    if (!offerBanner) {
      return NextResponse.json(
        { error: "offer Banner not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ result: offerBanner }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
