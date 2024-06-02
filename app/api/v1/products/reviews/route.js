import connectDatabase from "@/src/config/mongodbConnection";
import ProductReview from "@/src/models/productReview.models";
import User from "@/src/models/user.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const requestFromBody = await request.json();

    // valid json data are empty or null value
    const validatedJSON = validateJSON(requestFromBody);

    if (validatedJSON === true) {
      const { productID, user, content, rating } = requestFromBody;

      // check productID && user && content && rating are given or not
      if (!(productID && user && content && rating)) {
        return NextResponse.json({
          message:
            "productID && user && content && rating filed must be required",
        });
      }

      // if productid and user id are valid or not
      if (!mongoose.Types.ObjectId.isValid(productID)) {
        return NextResponse.json(
          { message: "productid are not valid mongodb object id" },
          { status: 400 }
        );
      } else if (!mongoose.Types.ObjectId.isValid(user)) {
        return NextResponse.json(
          { message: "user id are not valid mongodb object id" },
          { status: 400 }
        );
      }
      await connectDatabase("product review");
      // verify if user are product bought are not from cart
      const findUser = await User.findOne({ _id: user });

      if (findUser?.deliveries?.length == 0) {
        return NextResponse.json(
          { message: "your are not able to review - " },
          { status: 400 }
        );
      }
      const matchDelivaryProduct = findUser?.deliveries?.find(
        (pro) => pro.products
      );
      // todo when cart with payment system implement done

      //   const
      //   if () {
      //     //
      //   }

      // saved review in database
      //   const newReview = new ProductReview({
      //     productID,
      //     user,
      //     content,
      //     rating,
      //   });
      //   const saveReview = await newReview.save();

      // send response
      return NextResponse.json(
        { message: "Review added successfull", matchDelivaryProduct },
        { status: 201 }
      );
    } else {
      return NextResponse.json({
        message: "your json are not valid",
        validatedJSON,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
