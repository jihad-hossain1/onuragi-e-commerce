import { generateSlug } from "@/helpers/slugBuilder";
import { fieldValidate, validateFieldMaxMin } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Category from "@/src/models/category.models";
import Product from "@/src/models/product.models";
import SubCategory from "@/src/models/subCategory.models";
import { NextRequest, NextResponse } from "next/server";

async function generateUniqueID(): Promise<string> {
    await connectDatabase("products");
    const previousProducts = await Product.find({});

    const rememberPreviousItemCodes = previousProducts?.map(
        (product) => product?.PID,
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
        const {
            name,
            image,
            categoryID,
            price,
            slug,
            defaultColor,
            defaultSize,
        } = await req.json();

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
                { status: 400 },
            );
        }

        const productSlug = await generateSlug({
            Model: Product,
            filedName: "slug",
            value: slug?.trim()?.toLowerCase(),
        });
        const findCategory = await SubCategory.findById({ _id: categoryID });

        const productID = await generateUniqueID();

        // Create and save the new product
        const newProduct = new Product({
            PID: productID,
            name,
            image,
            categoryID,
            price: Number(price),
            slug: productSlug,
            defaultColor,
            defaultSize,
            parentCat: findCategory.catName,
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
