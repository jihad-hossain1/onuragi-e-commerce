import Product from "@/src/models/product.models";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const reqBody = await req.json();
  try {
    const { name, image, categoryID, price } = reqBody;

    if (!(name && image && categoryID && price)) {
      return NextResponse.json({ message: "All field are empty" });
    }

    if (name === "") {
      return NextResponse.json(
        { message: "name field required" },
        { status: 400 }
      );
    } else if (image === "") {
      return NextResponse.json({ message: "image Link field are empty" });
    } else if (categoryID === "") {
      return NextResponse.json({ message: "categoryID field are empty" });
    } else if (price === 0) {
      return NextResponse.json({ message: "price field are empty" });
    }

    const newProduct = new Product({ name, image, categoryID, price });
    const product = newProduct.save();

    return NextResponse.json({
      message: "product has created",
      status: 201,
      product,
    });
  } catch (error) {
    return NextResponse.json(reqBody);
  }
  try {
  } catch (error) {
    return NextResponse.json(error);
  }
}
