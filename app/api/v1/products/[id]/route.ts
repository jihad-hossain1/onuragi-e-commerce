import connectDatabase from "@/src/config/mongodbConnection";
import Image from "@/src/models/image.models";
import Product from "@/src/models/product.models";
import ProductDetail from "@/src/models/productDetails.models";
import SubCategory from "@/src/models/subCategory.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }) {
  try {
    const id = params.id;

    // check valid object id or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "your provide id is not valid" },
        { status: 400 }
      );
    }
    await connectDatabase("product");
    // find product from params id
    const product = await Product.findOne({
      _id: id,
    });

    if (!product) {
      return NextResponse.json(
        { message: "product are not found" },
        { status: 400 }
      );
    }

    // if product found then play another role
    if (product) {
      const { image, name, categoryID, price } = await req.json();

      if (price == 0) {
        return NextResponse.json(
          { message: "product price are 0 not allow" },
          { status: 400 }
        );
      } else if (name === "") {
        return NextResponse.json(
          { message: "product name is empty not allow" },
          { status: 400 }
        );
      } else if (
        categoryID === "" &&
        !mongoose.Types.ObjectId.isValid(categoryID)
      ) {
        return NextResponse.json(
          { message: "product category empty not allow" },
          { status: 400 }
        );
      } else if (image === "") {
        return NextResponse.json(
          { message: "product image link is empty not allow" },
          { status: 400 }
        );
      }

      const updatedPro = await Product.findByIdAndUpdate(
        { _id: product?._id },
        {
          $set: { image, name, categoryID, price },
        }
      );

      return NextResponse.json(updatedPro, { status: 201 });
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }) {
  try {
    const id = params.id;

    await connectDatabase("product");

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "product are not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
// export async function GET(req: NextRequest, { params }) {
//   try {
//     const id = params.id;

//     await connectDatabase();

//     const product = await Product.findById(id);

//     if (!product) {
//       return NextResponse.json(
//         { message: "product are not found" },
//         { status: 400 }
//       );
//     }

//     const productDetails = await ProductDetail.findOne({ productID: id });

//     if (!productDetails) {
//       return NextResponse.json(
//         { message: "product details are not found" },
//         { status: 400 }
//       );
//     }

//     const findCategory = await SubCategory.findById(product.categoryID);

//     const images = await Image.find({ productID: id });

//     return NextResponse.json(
//       { product, productDetails, category: findCategory?.name, images },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error?.message }, { status: 500 });
//   }
// }
