import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import { CATEGORIES, HOMEPAGE } from "@/constant";
import { NextResponse } from "next/server";
import Banner from "@/src/models/banner.model";
import OfferBanner from "@/src/models/offerbanner.model";

// Store the database connection once for all requests
let isConnected = false;

async function getDatabaseConnection() {
    if (isConnected) return;
    await connectDatabase("E-Commerce Home");
    isConnected = true;
}

async function fetchCategoryProducts(category: string) {
    return Product.find({ parentCat: category })
        .sort({ createdAt: -1 })
        .select("name image price slug")
        .limit(HOMEPAGE.LIMIT_PRODUCT)
        .lean();
}

export async function GET() {
    try {
        await getDatabaseConnection(); // Ensure DB connection is established only once

        // Query all categories concurrently
        const categories = [
            CATEGORIES.baby,
            CATEGORIES.girls,
            CATEGORIES.women,
            CATEGORIES.Handicraft,
            CATEGORIES.boys,
        ];
        const categoryQueries = categories.map((category) =>
            fetchCategoryProducts(category),
        );

        // Wait for all queries to resolve
        const [
            babyProducts,
            girlsProducts,
            womenProducts,
            handicraft,
            boysProducts,
        ] = await Promise.all(categoryQueries);

        const [banner, offerBanner] = await Promise.all([
            Banner.find({}).sort({ createdAt: -1 }).select("image").limit(HOMEPAGE.LIMIT_SLIDER),
            OfferBanner.find({}).sort({ createdAt: -1 }).select("image").limit(HOMEPAGE.LIMIT_OFFER_BANNER),
        ]);

        return NextResponse.json(
            {
                result: {
                    babyProducts,
                    girlsProducts,
                    womenProducts,
                    handicraft,
                    boysProducts,
                    banner,
                    offerBanner
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error in fetching products:", error); // Log for debugging
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
