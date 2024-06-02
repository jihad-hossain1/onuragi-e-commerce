import connectDatabase from "@/src/config/mongodbConnection";
import ProductQuestion from "@/src/models/productQuestion.models";
import Reply from "@/src/models/reply.models";
import User from "@/src/models/user.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const requestFromBody = await request.json();

    const isValid = validateJSON(requestFromBody);

    if (isValid === true) {
      const { questionID, user, content } = requestFromBody;

      // check productID && user && content && rating are given or not
      if (!(questionID && user && content)) {
        return NextResponse.json({
          message: "questionID && user && content filed must be required",
        });
      }
      // check valid object id or not
      if (!mongoose.Types.ObjectId.isValid(questionID)) {
        return NextResponse.json(
          { message: "question id is not valid" },
          { status: 400 }
        );
      } else if (!mongoose.Types.ObjectId.isValid(user)) {
        return NextResponse.json(
          { message: "userid is not valid" },
          { status: 400 }
        );
      }
      await connectDatabase("product reply");
      // check user and question are found or not
      const findUser = await User.findOne({ _id: user });
      const findQuestion = await ProductQuestion.findOne({ _id: questionID });

      if (findUser && findQuestion) {
        const newReply = await ProductQuestion.findByIdAndUpdate(
          { _id: questionID },
          {
            $push: {
              replies: { questionID, user, content },
            },
          },
          {
            new: true,
          }
        );
        //
        // const newReply = new Reply({ questionID, user, content });
        // const saveReply = await newReply.save();

        // //
        // findQuestion.replies.push(newReply);
        // await findQuestion.save();

        // console.log(newReply);
        return NextResponse.json(
          { message: "reply added successfull", newReply },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "may be user or product question are not found" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "json are not valid", isValid },
        { status: 400 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
