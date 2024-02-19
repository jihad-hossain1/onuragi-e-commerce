import ProductSpecification from "@/src/models/productSpecification.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const reqBody = await request.json();
  try {
    // checker for anyone can send undefine or {} or null value in api requiest
    const isValid = validateJSON(reqBody);

    if (isValid === true) {
      const {
        care,
        febric,
        sleeve,
        valueAddition,
        coller_Neck,
        sideCut,
        lengthWithStock,
        productID,
      } = reqBody;

      if (!mongoose.Types.ObjectId.isValid(productID)) {
        return NextResponse.json({ message: "your provide id is not valid" });
      }

      const alreadySpecification = await ProductSpecification.findOne({
        productID: productID,
      });

      if (alreadySpecification) {
        return NextResponse.json(
          { message: "Product specification already added " },
          { status: 400 }
        );
      }
      // save specification on database

      const newSpecification = new ProductSpecification({
        care,
        febric,
        sleeve,
        valueAddition,
        coller_Neck,
        sideCut,
        lengthWithStock,
        productID,
      });
      const saveSpecification = await newSpecification.save();

      return NextResponse.json(
        {
          message: "product specification added successfull",
          saveSpecification,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "inavlid fields: ", isValid });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
