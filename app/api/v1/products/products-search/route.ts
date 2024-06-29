import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import { NextRequest, NextResponse } from "next/server";

// Utility function to build search query
const buildSearchQuery = (searchTerm: string) => {
  if (!searchTerm) return {};

  const regex = { $regex: searchTerm, $options: "i" };
  return {
    $or: [{ name: regex }, { slug: regex }, { category: regex }],
  };
};

// Main handler function for GET request
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchTerm = searchParams.get("searchTerm") || "";

    await connectDatabase("product");

    const searchQuery = buildSearchQuery(searchTerm);
    const data = await Product.find(searchQuery);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
// import connectDatabase from "@/src/config/mongodbConnection";
// import Product from "@/src/models/product.models";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   const searchParams = req.nextUrl.searchParams;

//   const searchTerm = searchParams.get("searchTerm") || "";

//   await connectDatabase("product");

//   // Build search query
//   const searchQuery = searchTerm
//     ? {
//         $or: [
//           {
//             name: { $regex: searchTerm, $options: "i" },
//             slug: { $regex: searchTerm, $options: "i" },
//             category: { $regex: searchTerm, $options: "i" },
//           },
//         ],
//       }
//     : {};

//   // Fetch paginated data
//   const data = await Product.find(searchQuery);

//   return NextResponse.json({
//     data,
//   });
// }
