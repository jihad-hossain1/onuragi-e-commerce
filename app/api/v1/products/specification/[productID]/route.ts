import connectDatabase from "@/src/config/mongodbConnection";
import ProductSpecification from "@/src/models/productSpecification.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  try {
    const { productID } = params;

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json({ message: "your provide id is not valid" });
    }

    await connectDatabase();

    const findSpecification = await ProductSpecification.findOne({
      productID: productID,
    });

    if (findSpecification) {
      return NextResponse.json(
        { specification: findSpecification },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "products Specification are not found " },
        { status: 401 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
