import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import ProductQuestion from "@/src/models/productQuestion.models";
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
      const { productID, user, content } = requestFromBody;

      // check productID && user && content && rating are given or not
      if (!(productID && user && content)) {
        return NextResponse.json({
          message: "productID && user && content filed must be required",
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
      await connectDatabase("product questions");
      // verify if user are product bought are not from cart
      const findUser = await User.findOne({ _id: user });
      const findProduct = await Product.findOne({ _id: productID });

      if (findUser && findProduct) {
        // saved review in database
        const newQuestion = new ProductQuestion({
          productID,
          user,
          content,
        });
        const saveQuestion = await newQuestion.save();

        // send response
        return NextResponse.json(
          { message: "Question added successfull", saveQuestion },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "may user or product are not found" },
          { status: 400 }
        );
      }
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
// app.get("/comments", async (req, res) => {
//   try {
//     const comments = await Comment.find().populate("replies");
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export async function GET() {
//   try {
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
