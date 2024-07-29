import { validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import User from "@/src/models/user.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { productId, quantity, userId, size, color } = await request.json();

  try {
    validateOBJID(productId, "Product ID");
    validateOBJID(userId, "User ID");

    await connectDatabase("user");

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const findSameProduct = user.carts.find(
      (product: any) => product.product == productId
    );

    if (findSameProduct) {
      findSameProduct.quantity += quantity;
      const cart =  await user.save();
      return NextResponse.json(
        { message: "already in cart", result: cart.carts },
        {
          status: 200,
        }
      );
    } else {
      user.carts.push({ product: productId, quantity, userId, size, color });
    const cart =  await user.save();

      return NextResponse.json(
        { message: "Product added to cart successfully.", result: cart.carts },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid user info." }, { status: 400 });
  }

  try {
    await connectDatabase("user");

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const _userCart = user.carts;

    // Populate product details for each cart item
    const populatedCart = await Promise.all(
      _userCart.map(async (item) => {
        const product = await Product.findOne(
          { _id: item.product },
          "name price image"
        );
        return {
          ...item._doc,
          productDetails: product,
        };
      })
    );

    // user delivery products
    const userOrder = user.deliveries;

    const populatedUserOrder = await Promise.all(
      userOrder.map(async (item) => {
        const product = await Product.find(
          { _id: item.products.map((product: any) => product.product) },
          "name price image"
        );
        return {
          ...item._doc,
          details: product,
        };
      })
    );

    // Calculate the total price
    const totalPrice = populatedCart.reduce((sum, item) => {
      return sum + item.productDetails.price * item.quantity;
    }, 0);

    return NextResponse.json(
      {
        result: populatedCart,
        totalPrice: totalPrice,
        orders: populatedUserOrder,
        profile: user?.profile,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { productId, userId } = await req.json();
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product info." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user info." },
        { status: 400 }
      );
    }

    await connectDatabase("user");
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const findSameProduct = user.carts.find(
      (product: any) => product.product == productId
    );
    if (!findSameProduct) {
      return NextResponse.json(
        { error: "Product not found in cart." },
        { status: 404 }
      );
    } else {
      user.carts = user.carts.filter(
        (product: any) => product.product != productId
      );
      await user.save();
      return NextResponse.json(
        { message: "Product removed from cart successfully.", result: "ok" },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
