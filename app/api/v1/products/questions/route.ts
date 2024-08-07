import { fieldValidate, validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import Product from "@/src/models/product.models";
import ProductQuestion from "@/src/models/productQuestion.models";
import Reply from "@/src/models/reply.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productID, user, content } = await request.json();

    fieldValidate(content, "Question Content");

    // if productid and user id are valid or not
    validateOBJID(productID, "Product Id");
    validateOBJID(user?.id, "user Id");

    await connectDatabase("product questions");
    // verify if user are product bought are not from cart
    const findUser = await User.findOne({ _id: user?.id });
    const findProduct = await Product.findOne({ _id: productID });

    if (!(findUser && findProduct)) {
      return NextResponse.json(
        { message: "may user or product are not found" },
        { status: 400 }
      );
    }

    const newQuestion = new ProductQuestion({
      productID,
      user,
      content,
    });

    const saveQuestion = await newQuestion.save();

    // send response
    return NextResponse.json(
      { message: "Question added successful", result: saveQuestion },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const productID = searchParams.get("id") || "";

  try {
    validateOBJID(productID, "Product Id");

    await connectDatabase("product questions");

    const findProduct = await Product.findOne({ _id: productID });

    if (findProduct) {
      const productQuestions = await ProductQuestion.find({
        productID: productID,
      })

      const questionsWithReplies = await Promise.all(
        productQuestions.map(async (question) => {
          const replies = await Reply.find({ questionID: question._id });
          return {
            ...question.toObject(),
            replies: replies,
          };
        })
      );

      return NextResponse.json(
        { result: questionsWithReplies },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "product not found" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

