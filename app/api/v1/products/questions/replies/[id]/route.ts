import { validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import ProductQuestion from "@/src/models/productQuestion.models";
import Reply from "@/src/models/reply.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }) {
  const { id } = params;
  const { userId } = await req.json();

  try {
    validateOBJID(id, "Reply Id");
    validateOBJID(userId, "User Id");

    await connectDatabase("product reply");
    const findReplyUser = await User.findById(userId);
    const findReply = await Reply.findById(id);

    if (!(findReplyUser?._id == findReply?.user?.id)) {
      return NextResponse.json({
        error: "you can't delete this reply, it's not yours",
      });
    }

    const deleteReply = await Reply.findByIdAndDelete(id);

    const updateQuestion = await ProductQuestion.findByIdAndUpdate(
      findReply?.questionID,
      {
        $pull: { replies: id },
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        message: "Reply deleted successful",
        result: { content: deleteReply?.content?.slice(0, 15) },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error?.message,
    });
  }
}


export async function PATCH(req: NextRequest, { params }) {
  const { content, userId, id } = await req.json();
  const rid = params?.id;

  try {
    validateOBJID(userId, "User ID");
    validateOBJID(id, "Question ID");

    await connectDatabase("Question db");

    const findUser = await User.findById(userId);
    const findRply = await Reply.findById(id);

    if (!(findUser._id == findRply.user.id)) {
      return NextResponse.json(
        { error: "You are not author this content" },
        { status: 404 }
      );
    }

    const updateQuestion = await Reply.findByIdAndUpdate(
      rid,
      {
        $set: {
          content: content || findRply.content,
        },
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        message: "Content Update Successful",
        result: { content: updateQuestion.content },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}