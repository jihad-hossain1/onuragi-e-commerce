import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import ProductDetail from "@/src/models/productDetails.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  try {
    // checker for anyone can send undefine or {} or null value in api requiest
    const isValid = validateJSON(reqBody);

    if (isValid === true) {
      const { productID, about, sizeGuide, sizes } = reqBody;

      // check product size with any empty array
      if (sizes?.length == 0) {
        return NextResponse.json(
          {
            message: "Please provide minimum two size with price",
          },
          { status: 400 }
        );
      }
      // check productID valid or invalid
      if (!mongoose.Types.ObjectId.isValid(productID)) {
        return NextResponse.json(
          {
            message: "your product id is not valid",
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
      const updateProduct = await Product.findByIdAndUpdate(
        productID,
        { $set: { details: savedDetails._id } },
        { new: true }
      );

      return NextResponse.json(
        {
          message: "product details added successfull",
          productDetail: savedDetails,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "inavlid fields: ", isValid });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "You got an error from server: ", error },
      { status: 500 }
    );
  }
}
