import User from "@/src/models/user.models";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req, res) {
  const users = await User.find();

  return NextResponse.json(users);
  // return users;
}

export async function POST(req, res) {
  const _d = await req.json();
  console.log(_d);
  const { username, email, password, fullname } = _d;
  try {
    if (username == "") {
      return NextResponse.json(
        { message: "username fields is required" },
        { status: 401 }
      );
    } else if (email == "") {
      return NextResponse.json(
        { message: "email fields is required" },
        { status: 401 }
      );
    } else if (fullname == "") {
      return NextResponse.json(
        { message: "fullname fields is required" },
        { status: 401 }
      );
    } else if (password == "") {
      return NextResponse.json(
        { message: "password fields is required" },
        { status: 401 }
      );
    } else if (password?.length < 6) {
      return NextResponse.json(
        { message: "password must me 6 charecter" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email });

    if (user?.email == email) {
      return NextResponse.json(
        { error: "user email already exist" },
        { status: 400 }
      );
    }

    const hashedPad = await bcrypt.hash(password, 10);

    await User.create({ fullname, username, password: hashedPad, email });

    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "something wrong from server ",
      status: 500,
      message: error?.message,
      error,
    });
  }
}

// export { handler as GET };
