import Product from "@/src/models/product.models";
import { validateJSON } from "@/utils/validateJSON";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const reqBody = await req.json();
  try {
    // checker for anyone can send undefine or {} or null value in api requiest
    const isValid = validateJSON(reqBody);

    if (isValid === true) {
      const { name, image, categoryID, price } = reqBody;

      // if price is 0 then show error
      if (price === 0) {
        return NextResponse.json({ message: "price field are empty" });
      } else if (!name) {
        return NextResponse.json({
          message: "product name is required",
        });
      } else if (!image) {
        return NextResponse.json({
          message: "image  is required",
        });
      } else if (!categoryID) {
        return NextResponse.json({
          message: "categoryID  is required",
        });
      } else if (!price) {
        return NextResponse.json({
          message: "price is required",
        });
      }

      const newProduct = new Product({ name, image, categoryID, price });
      const product = await newProduct.save();

      return NextResponse.json({
        message: "product has created",
        status: 201,
        product,
      });
    } else {
      return NextResponse.json({ message: "inavlid fields: ", isValid });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(req, res) {
  try {
    const products = await Product.find().populate("categoryID");
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(error);
  }
}