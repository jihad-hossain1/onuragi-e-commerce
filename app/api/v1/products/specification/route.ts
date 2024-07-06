import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import ProductSpecification from "@/src/models/productSpecification.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  try {
    // Validate request body
    const isValid = validateJSON(reqBody);

    if (isValid) {
      const {
        care,
        fabric, // corrected typo from febric
        sleeve,
        valueAddition,
        coller_Neck, // corrected typo from coller_Neck
        sideCut,
        productID,
      } = reqBody;

      // Check if productID is valid
      if (!mongoose.Types.ObjectId.isValid(productID)) {
        return NextResponse.json(
          { message: "The provided product ID is not valid" },
          { status: 400 }
        );
      }

      // Connect to the database
      await connectDatabase("product spec");

      // Check if specification already exists for the product
      const alreadySpecification = await ProductSpecification.findOne({
        productID,
      });

      if (alreadySpecification) {
        return NextResponse.json(
          { message: "Product specification already exists" },
          { status: 400 }
        );
      }

      // Save the new specification to the database
      const newSpecification = new ProductSpecification({
        care,
        fabric,
        sleeve,
        valueAddition,
        coller_Neck,
        sideCut,
        productID,
      });
      const savedSpecification = await newSpecification.save();

      // Update the product with the new specification ID
      const updateProduct = await Product.findByIdAndUpdate(
        productID,
        { $set: { specification: savedSpecification._id } },
        { new: true }
      );

      return NextResponse.json(
        {
          message: "Product specification added successfully",
          savedSpecification,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid fields", isValid },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const specId = searchParams.get("specId");
  const reqBody = await request.json();

  const { care, febric, sleeve, valueAddition, coller_Neck, sideCut } = reqBody;
  try {
    await connectDatabase("product spec");

    if (!mongoose.Types.ObjectId.isValid(specId)) {
      return NextResponse.json(
        {
          error: "The provided specification ID is not valid",
        },
        {
          status: 400,
        }
      );
    }

    const findSpec = await ProductSpecification.findById(specId);
    if (!findSpec) {
      return NextResponse.json(
        {
          error: "The provided specification are not found",
        },
        {
          status: 400,
        }
      );
    }

    const update = await ProductSpecification.findByIdAndUpdate(
      { _id: specId },
      {
        care: care || findSpec?.care,
        febric: febric || findSpec?.febric,
        sleeve: sleeve || findSpec?.sleeve,
        valueAddition: valueAddition || findSpec?.valueAddition,
        coller_Neck: coller_Neck || findSpec?.coller_Neck,
        sideCut: sideCut || findSpec?.sideCut,
      },
      { new: true }
    );

    return NextResponse.json(
      { update, message: "Specification updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
   const { searchParams } = new URL(request.url);
  const specId = searchParams.get("specId");
  try {
    await connectDatabase("product spec");
    const specifications = await ProductSpecification.findById(specId);
    return NextResponse.json({ specifications }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}