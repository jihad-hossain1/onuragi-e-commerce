import connectDatabase from "@/src/config/mongodbConnection";
import Category from "@/src/models/category.models";
import { NextResponse } from "next/server";
import { generateUniqueID } from "@/helpers/generateId";

export async function POST(req, res) {
  const reqBody = await req.json();
  try {
    // category are validation
    if (reqBody?.name === "") {
      return NextResponse.json({ message: "category name field are requied" });
    }

    // already category exist
    const namedEmpty = reqBody.name.trim();
    await connectDatabase("product Category");
    const categoryExist = await Category.findOne({
      name: reqBody.name,
    });
    if (categoryExist?.name === namedEmpty) {
      return NextResponse.json({ message: "Category name are already exist" });
    }

    // generate sid
    const sid = await generateUniqueID(Category, "sid", "CAT");
    // save category
    const newCategory = new Category({ name: reqBody.name, sid: sid });
    const category = await newCategory.save();

    // send respon on user
    return NextResponse.json({
      message: "Category are created",
      status: 201,
      category,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(req, res) {
  try {
    await connectDatabase("product Category");
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json();
  }
}
