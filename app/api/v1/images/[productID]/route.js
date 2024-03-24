import connectDatabase from "@/src/config/mongodbConnection";
import Image from "@/src/models/image.models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { productID } = params;

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json({ message: "your provide id is not valid" });
    }
    await connectDatabase();
    const productImages = await Image.find({
      productID: productID,
    });
    console.log("productImages here: ", productImages);

    if (productImages) {
      return NextResponse.json({ images: productImages }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "productImages are not found " },
        { status: 401 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
