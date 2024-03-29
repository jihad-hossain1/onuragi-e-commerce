import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import ProductDetail from "@/src/models/productDetails.models";
import SubCategory from "@/src/models/subCategory.models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    // check valid object id or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "your provide id is not valid" },
        { status: 400 }
      );
    }
    await connectDatabase();
    // find prouct from params id
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

      return NextResponse.json(
        { updateProduct: updatedPro, message: "product updated successfull" },
        { status: 201 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const id = params.id;
    await connectDatabase();
    const singleProdut = await Product.findById(id).populate("categoryID");

    // const findCategroy = await SubCategory.findOne({});

    // const details = await ProductDetail.findOne({});

    // const fullProductsDetails = {
    //   ...singleProdut,
    //   ...findCategroy,
    //   ...details,
    // };

    // console.log(fullProductsDetails);

    return NextResponse.json(singleProdut);
  } catch (error) {}
}
