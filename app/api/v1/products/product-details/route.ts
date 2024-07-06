import connectDatabase from "@/src/config/mongodbConnection";
import Image from "@/src/models/image.models";
import Product from "@/src/models/product.models";
import ProductDetail from "@/src/models/productDetails.models";
import ProductSpecification from "@/src/models/productSpecification.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  try {
    const { productID, about, sizeGuide, sizes } = reqBody;

    // check product size with any empty array
    if (sizes?.length == 0) {
      return NextResponse.json(
        {
          error: "Please provide minimum two size with price",
        },
        { status: 400 }
      );
    }
    // check productID valid or invalid
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json(
        {
          error: "your product id is not valid",
        },
        { status: 400 }
      );
    }

    // calculate product quantity
    const productQuantity = sizes?.reduce(
      (previous, current) => previous + current?.quantity,
      0
    );
    await connectDatabase("product details");
    //   build new product details
    const newDetails = new ProductDetail({
      productID,
      about,
      sizeGuide,
      quantity: productQuantity,
      sizes,
    });
    const savedDetails = await newDetails.save();

    // Update the product with the new specification ID
    await Product.findByIdAndUpdate(
      productID,
      { $set: { details: savedDetails._id } },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "product details added successful",
        result: savedDetails,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "You got an error from server: ", error },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const productSlug = searchParams.get("slug");
  const sliceSlug = productSlug?.split("=")[0];
  const sliceId = productSlug?.split("=")[1];

  try {
    await connectDatabase("product details");

    let result = {};

    const product = await Product.findOne({
      $or: [{ _id: sliceId }, { slug: sliceSlug }],
    });

    const findDetails = await ProductDetail.findOne({
      productID: product?._id,
    });

    const findSpecification = await ProductSpecification.findOne({
      productID: product?._id,
    });

    const findImages = await Image.findOne({ productID: product?._id });

    result = {
      product: product,
      details: findDetails,
      specification: findSpecification,
      images: findImages,
    };

    return NextResponse.json(
      {
        result: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

