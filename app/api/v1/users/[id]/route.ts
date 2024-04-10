import connectDatabase from "@/src/config/mongodbConnection";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }) {
  const id = params.id as { id: string };

  try {
    await connectDatabase();

    const findUser = await User.findById(id);

    if (!findUser) {
      return NextResponse.json(
        { error: "user are not found" },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "user deleted ok." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }) {
  const id = params.id as { id: string };

  try {
    await connectDatabase();

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "user are not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }) {
  const id = params.id as { id: string };

  try {
    const { fullname, email, username } = await req.json();

    await connectDatabase();

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "user are not found" },
        { status: 400 }
      );
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        fullname: fullname || undefined,
        email: email || undefined,
        username: username || undefined,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        user: {
          fullname: updateUser.fullname,
          email: updateUser.email,
          username: updateUser.username,
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
