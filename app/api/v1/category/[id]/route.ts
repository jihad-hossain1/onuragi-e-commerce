import { generateUniqueID } from "@/helpers/generateId";
import connectDatabase from "@/src/config/mongodbConnection";
import Category from "@/src/models/category.models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }) {
  const { name } = await req.json();
  const id = params.id;
  try {
    // check valid object id or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "your provide id is not valid" },
        { status: 400 }
      );
    }

    await connectDatabase("Product Category");

    const check = await Category.findById({ _id: id });
    if (!check?.sid) {
      const sid = await generateUniqueID(Category, "sid", "CAT");
      await Category.findByIdAndUpdate({ _id: id }, { sid: sid });
    }

    const update = await Category.findByIdAndUpdate(
      { _id: id },
      { name: name || undefined },
      { new: true }
    );

    return NextResponse.json(
      {
        category: {
          name: update.name,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
