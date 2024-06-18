import { validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import ProductQuestion from "@/src/models/productQuestion.models";
import Reply from "@/src/models/reply.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }) {
  const { userId } = await req.json();
  try {
    const { id } = params;

    validateOBJID(id, "Question Id");
    validateOBJID(userId, "User Id");

    await connectDatabase("product questions");

    const findQuestionUser = await User.findById(userId);
    const findQuestion = await ProductQuestion.findById(id);

    if (!(findQuestionUser?._id == findQuestion?.user?.id)) {
      return NextResponse.json({
        error: "you can't delete this question, it's not yours",
      });
    }

    const deleteQuestionWithReplies = await ProductQuestion.findByIdAndDelete(
      id
    );

    const deleteReplies = await Reply.deleteMany({
      questionID: id,
    });

    return NextResponse.json(
      {
        message: "Question deleted successful",
        result: {
          content: deleteQuestionWithReplies?.content?.slice(0, 20) + "...",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }) {
  const { content, userId, qid } = await req.json();
  const { id } = params;

  try {
    validateOBJID(userId, "User ID");
    validateOBJID(qid, "Question ID");

    await connectDatabase("Question db");

    const findUser = await User.findById(userId);
    const findQuestion = await ProductQuestion.findById(qid);

    if (!(findUser._id == findQuestion.user.id)) {
      return NextResponse.json(
        { error: "You are not author this content" },
        { status: 404 }
      );
    }

    const updateQuestion = await ProductQuestion.findByIdAndUpdate(
      id,
      {
        $set: {
          content: content || findQuestion.content,
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
