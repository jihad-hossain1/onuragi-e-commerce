import connectDatabase from "@/src/config/mongodbConnection";
import ProductDetail from "@/src/models/productDetails.models";
import User from "@/src/models/user.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { quantity, productId, userId } = await req.json();

  try {
    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product info." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDatabase("user");

    // Find the product in the database
    const findSameProduct = await ProductDetail.findOne({
      productID: productId,
    });

    if (!findSameProduct) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    // Find the user in the database
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Find the product in the user's cart
    const productInCart = user.carts.find(
      (product: any) => product.product == productId
    );

    if (!productInCart) {
      return NextResponse.json(
        { error: "Product not found in cart." },
        { status: 404 }
      );
    }

    // Decrease the quantity of the product in the cart
    productInCart.quantity = quantity - 1;

    // Remove the product from the cart if the quantity is zero or less
    if (productInCart.quantity <= 0) {
      user.carts = user.carts.filter(
        (product: any) => product.product != productId
      );
    }

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      { message: "Updated successfully", result: user.carts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
