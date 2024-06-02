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

    const findDetails = await ProductDetail.findOne({
      productID: productID,
    });

    if (findDetails) {
      return NextResponse.json({ productDetail: findDetails }, { status: 201 });
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
