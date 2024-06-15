import connectDatabase from "@/src/config/mongodbConnection";
import ProductDetail from "@/src/models/productDetails.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  try {
    const { productID } = params;

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json({ message: "your provide id is not valid" });
    }

    await connectDatabase("product details");

    const findDetails = await ProductDetail.findById(productID);

    if (findDetails) {
      return NextResponse.json({ productDetail: findDetails }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "products details are not found" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }) {
  try {
    const { productID } = params;
    const { about, sizeGuide, sizes, detailId } = await req.json();
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json({ error: "your provide id is not valid" });
    }

    await connectDatabase("product details");

    const findDetails = await ProductDetail.findById(productID);

    if (findDetails) {
      const updateDetails = await ProductDetail.findByIdAndUpdate(
        detailId,
        {
          $set: {
            about: about || findDetails?.about,
            sizeGuide: sizeGuide || findDetails?.sizeGuide,
            sizes: sizes || findDetails?.sizes,
          },
        },
        { new: true }
      );
      return NextResponse.json(
        {
          result: updateDetails,
          message: "product details updated successfully",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "products details are not found" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
