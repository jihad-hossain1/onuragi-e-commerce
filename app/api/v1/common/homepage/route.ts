import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import { NextRequest, NextResponse } from "next/server";

// Utility function to extract all search params dynamically
const getSearchParams = (searchParams: URLSearchParams) => {
    const params: { [key: string]: string | null } = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // Use the dynamic utility function to get all query params
    const { categories, subcategories, slider_card, baby_card, new_arrival, girls_products, boys_products,products } = getSearchParams(searchParams);

    await connectDatabase("E-Commerce db");


      const [babyProducts, girlsProducts, boysProducts] = await Promise.all([
        Product.find({ category: "baby" }).select("name image price slug").lean(),
        Product.find({ category: "girls" }).select("name image price slug").lean(),
        Product.find({ category: "boys" }).select("name image price slug").lean()
      ]);
            

    return NextResponse.json({ result: { babyProducts, girlsProducts, boysProducts } }, { status: 200 });
}
