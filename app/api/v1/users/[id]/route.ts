import connectDatabase from "@/src/config/mongodbConnection";
import User from "@/src/models/user.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }) {
  const id = params.id as { id: string };

  try {
    await connectDatabase("user");

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
    await connectDatabase("user");

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
  const id = params.id;

  const {
    fullname,
    username,
    mobile,
    street,
    city,
    zipCode,
    dstreet,
    dcity,
    dzipCode,
    image,
    gender,
  } = await req.json();

  try {
    if (!id) {
      return NextResponse.json(
        { error: "user id is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "invalid user id" }, { status: 400 });
    }

    await connectDatabase("user");

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }



    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          fullname: fullname || user?.fullname,
          username: username || user?.username,
          profile: {
            mobile: mobile || user?.profile?.mobile,
            image: image || user?.profile?.image,
            gender: gender || user?.profile?.gender,
            address: {
              street: street || user?.profile?.address?.street,
              city: city || user?.profile?.address?.city,
              zipCode: zipCode || user?.profile?.address?.zipCode,
            },
            deliveryAddress: {
              dstreet: dstreet || user?.profile?.deliveryAddress?.dstreet,
              dcity: dcity || user?.profile?.deliveryAddress?.dcity,
              dzipCode: dzipCode || user?.profile?.deliveryAddress?.dzipCode,
            },
          },
        },
      },
      { new: true } // return the updated document
    );

    return NextResponse.json({ result: updateUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}