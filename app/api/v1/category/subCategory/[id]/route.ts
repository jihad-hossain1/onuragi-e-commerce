import { generateUniqueID } from "@/helpers/generateId";
import connectDatabase from "@/src/config/mongodbConnection";
import Category from "@/src/models/category.models";
import SubCategory from "@/src/models/subCategory.models";
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

    await connectDatabase("Sub Category");
    const check = await SubCategory.findById({ _id: id });
    if (!check?.sid) {
      const sid = await generateUniqueID(SubCategory, "sid", "CAT");
      await SubCategory.findByIdAndUpdate({ _id: id }, { sid: sid });
    }
    if(!check?.catName){
      const findCat = await Category.findById({ _id: check?.categoryID });
      const _name = findCat?.name
      await SubCategory.findByIdAndUpdate({ _id: id }, { catName: _name });
    }
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
