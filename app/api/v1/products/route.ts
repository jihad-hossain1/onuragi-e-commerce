import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import { validateJSON } from "@/utils/validateJSON";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

      await connectDatabase();

      const newProduct = new Product({ name, image, categoryID, price });

      const product = await newProduct.save();

      return NextResponse.json(product, { status: 201 });
    } else {
      return NextResponse.json({ message: "inavlid fields: ", isValid });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET() {
  try {
    await connectDatabase();

    const products = await Product.find().select("_id name image price");

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
