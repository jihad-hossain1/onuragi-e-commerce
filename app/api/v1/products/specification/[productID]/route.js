import ProductSpecification from "@/src/models/productSpecification.models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { productID } = params;

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json({ message: "your provide id is not valid" });
    }

    const findSpecification = await ProductSpecification.findOne({
      productID: productID,
    });
    console.log("product Specification here: ", findSpecification);

    if (findSpecification) {
      return NextResponse.json(
        { Specification: findSpecification },
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
