import ProductDetail from "@/src/models/productDetails.models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    console.log(params);
    const { productID } = params;

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json({ message: "your provide id is not valid" });
    }

    const findDetails = await ProductDetail.findOne({ productID });
    console.log(findDetails);

    if (findDetails) {
      return NextResponse.json({ productDetail: findDetails }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "products details are not found " },
        { status: 201 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
