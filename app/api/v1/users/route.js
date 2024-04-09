import User from "@/src/models/user.models";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDatabase from "@/src/config/mongodbConnection";

export async function GET(req, res) {
  await connectDatabase();
  
  const users = await User.find().select('fullname _id email')

  return NextResponse.json(users);
  // return users;
}

export async function POST(req) {
  const _d = await req.json();

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

    await connectDatabase();
    const user = await User.findOne({ email });

    if (user?.email == email) {
      return NextResponse.json(
        { error: "user email already exist" },
        { status: 400 }
      );
    }

    const hashedPad = await bcrypt.hash(password, 10);

    const roles = await User.find()

    const findUnique = roles?.find(role => role.role == 'admin');

    console.log("find user role", findUnique);

    // if(user.role !== 'admin')

    if (!findUnique) {
      
      await User.create({ fullname, username, password: hashedPad, email, role: "admin" });
      
      return NextResponse.json({ message: "user created you are admin now" }, { status: 201 });
    }

    await User.create({ fullname, username, password: hashedPad, email });

    return NextResponse.json({ message: "user created" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error?.message,
      error,
    });
  }
}

// export { handler as GET };
