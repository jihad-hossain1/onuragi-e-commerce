import { fieldValidate, validateFieldMaxMin } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the JSON structure
    const { name, image, categoryID, price, slug } = body;

    // Validate individual fields
    fieldValidate(categoryID, "Category Name");
    validateFieldMaxMin(name, "Product Name", 5, 50);
    validateFieldMaxMin(slug, "Product Slug", 5, 50);
    fieldValidate(price, "Price");
    fieldValidate(image, "Product Image");

    // Ensure price is a number
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      throw new Error("Price must be a valid number.");
    }

    // Connect to the database
    await connectDatabase("product");

    const isProdutSlug = await Product.findOne({
      slug: slug.trim().toLowerCase(),
    });
    if (isProdutSlug) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    // Create and save the new product
    const newProduct = new Product({
      name,
      image,
      categoryID,
      price: priceNumber,
      slug: slug.trim().toLowerCase(),
    });
    const product = await newProduct.save();

    return NextResponse.json({ result: product }, { status: 201 });
  } catch (error) {
    // Return a consistent error response
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDatabase("product");

    const products = await Product.find({});

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
