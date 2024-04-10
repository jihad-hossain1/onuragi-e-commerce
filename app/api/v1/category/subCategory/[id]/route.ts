import connectDatabase from "@/src/config/mongodbConnection";
import SubCategory from "@/src/models/subCategory.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }) {
  const { name } = await req.json();
  
  console.log("TCL ~ PATCH ~ name:", name);

  const id = params.id;
  try {
    // check valid object id or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "your provide id is not valid" },
        { status: 400 }
      );
    }

    await connectDatabase();

    const update = await SubCategory.findByIdAndUpdate(
      { _id: id },
      { name: name || undefined },
      { new: true }
    );

    return NextResponse.json(
      {
        sub: {
          name: update.name,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
