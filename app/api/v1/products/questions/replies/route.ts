import { fieldValidate, validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import ProductQuestion from "@/src/models/productQuestion.models";
import Reply from "@/src/models/reply.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { questionID, user, content } = await request.json();

    // check productID && user && content && rating are given or not
    fieldValidate(questionID, "question ID");
    fieldValidate(user, "user ID");
    fieldValidate(content, "reply content");

    // check valid object id or not
    validateOBJID(questionID, "question ID");
    validateOBJID(user, "user ID");

    await connectDatabase("product reply");
    // check user and question are found or not
    const findUser = await User.findOne({ _id: user?.id });
    const findQuestion = await ProductQuestion.findOne({ _id: questionID });

    if (findUser && findQuestion) {
      //
      const newReply = new Reply({ questionID, user, content });
      const saveReply = await newReply.save();

      if (saveReply) {
        await ProductQuestion.findOneAndUpdate(
          { _id: questionID },
          { $push: { replies: saveReply._id } },
          { new: true }
        );
      }

      return NextResponse.json(
        { message: "reply added successful", result: saveReply },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "may be user or product question are not found" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
