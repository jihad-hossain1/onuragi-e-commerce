import { validateFieldMaxMin, validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import EcomDelivery from "@/src/models/ecomdelivery";
import Product from "@/src/models/product.models";
import ProductReview from "@/src/models/productReview.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { user, content, productId } = await request.json();

  try {
    validateFieldMaxMin(content, "Review Content", 5, 300);
    validateOBJID(user?.id, "user Id");
    validateOBJID(productId, "Product Id");

    await connectDatabase("user")

    const findUser = await User.findById(user?.id);

    if (!findUser) {
      return NextResponse.json({
        error: "user are not found"
      }, { status: 409 });
    }

    const findProduct = await Product.findById(productId);

    if (!findProduct) {
      return NextResponse.json({
        error: "product are not found"
      }, { status: 409 });
    }

    const findUsersEcomDelivery = await EcomDelivery.find({ userId: user?.id });

    const products = findUsersEcomDelivery?.map((item) => item?.products)?.flat()

    const findUniqueProduct = products?.find((_item) => _item?.product == productId);

    if (!findUniqueProduct) {
      return NextResponse.json({ error: "You are not able to review this product, buy this product then able to review" }, { status: 401 });
    }

    // const findReview = await ProductReview.findOne({ $or: [{ userId: user?.id }, { productId: productId }] })

    // if (findReview) {
    //   return NextResponse.json({ error: "Your Review already exist" }, { status: 401 });
    // }

    const newReview = new ProductReview({
      content: content,
      productId: productId,
      user: user,
      userId: user?.id
    })

    const saveReview = await newReview.save();
    return NextResponse.json({ result: saveReview, message: "Review Added Successfull" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pid = searchParams.get("id");

  const findReviews = await ProductReview.find({ productId: pid }).select('content createdAt rating user')

  console.log("findreviews", findReviews)

  return NextResponse.json({ result: findReviews }, { status: 200 });
}