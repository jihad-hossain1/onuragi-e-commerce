import { validateFieldMaxMin } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Image from "@/src/models/image.models";
import Product from "@/src/models/product.models";
import ProductDetail from "@/src/models/productDetails.models";
import ProductSpecification from "@/src/models/productSpecification.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { productID, about, sizeGuide, sizes, defaultColor, defaultSize } =
        await req.json();
    try {
        // check product size with any empty array
        if (sizes?.length == 0) {
            return NextResponse.json(
                {
                    error: "Please provide minimum two size with price",
                },
                { status: 400 },
            );
        }

        validateFieldMaxMin(defaultColor, "default color", 3, 20);
        validateFieldMaxMin(defaultSize, "default size", 3, 20);

        // check productID valid or invalid
        if (!mongoose.Types.ObjectId.isValid(productID)) {
            return NextResponse.json(
                {
                    error: "your product id is not valid",
                },
                { status: 400 },
            );
        }

        // calculate product quantity
        const productQuantity = sizes?.reduce(
            (previous, current) => previous + current?.quantity,
            0,
        );

        await connectDatabase("product details");

        //   build new product details
        const newDetails = new ProductDetail({
            productID,
            about,
            sizeGuide,
            quantity: productQuantity,
            sizes,
            defaultColor,
            defaultSize,
        });

        const savedDetails = await newDetails.save();

        // Update the product with the new specification ID
        await Product.findByIdAndUpdate(
            productID,
            { $set: { details: savedDetails._id } },
            { new: true },
        );

        return NextResponse.json(
            {
                message: "product details added successful",
                result: savedDetails,
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "You got an error from server: ", error },
            { status: 500 },
        );
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const productSlug = searchParams.get("slug");

    try {
        await connectDatabase("product details");

        const product = await Product.findOne({
            slug: productSlug,
        });

        const [findDetails, findSpecification, findImages] = await Promise.all([
            ProductSpecification.findOne({
                productID: product?._id,
            }),
            ProductDetail.findOne({
                productID: product?._id,
            }),
            Image.findOne({ productID: product?._id }),
        ]);
        return NextResponse.json(
            {
                result: {
                    product: product,
                    details: findDetails,
                    specification: findSpecification,
                    images: findImages,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
