import { fieldValidate, validateFieldMaxMin } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import { NextRequest, NextResponse } from "next/server";


async function generateUniqueID(): Promise<string> {
  await connectDatabase("products");
  const previousProducts = await Product.find({});

  const rememberPreviousItemCodes = previousProducts?.map(
    (product) => product?.PID
  );

  // Extract the numeric part of the IDs and find the maximum number
  const maxNumber = rememberPreviousItemCodes?.reduce((max, id) => {
    const num = parseInt(id?.replace("PID", ""), 5);
    return num > max ? num : max;
  }, 0);

  // Increment the maximum number by 1
  const nextNumber = maxNumber + 1;

  // Format the new ID with leading zeros
  const newID = `PID${nextNumber?.toString()?.padStart(3, "0")}`;

  return newID;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the JSON structure
    const { name, image, categoryID, price, slug, defaultColor, defaultSize } =
      body;

    // Validate individual fields
    fieldValidate(categoryID, "Category Name");
    validateFieldMaxMin(name, "Product Name", 5, 50);
    validateFieldMaxMin(defaultColor, "Default Color", 3, 20);
    validateFieldMaxMin(defaultSize, "Default Size", 3, 20);
    fieldValidate(slug, "Product Slug");
    fieldValidate(price, "Price");
    // fieldValidate(image, "Product Image");


    // Connect to the database
    await connectDatabase("product");

    const isProdutSlug = await Product.findOne({
      slug: slug?.trim()?.toLowerCase(),
    });
    if (isProdutSlug) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    const productID = await generateUniqueID();

    // Create and save the new product
    const newProduct = new Product({
      PID: productID,
      name,
      image,
      categoryID,
      price: Number(price),
      slug: slug?.trim()?.toLowerCase(),
      defaultColor,
      defaultSize,
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
