import { generateUniqueID } from "@/helpers/generateId";
import connectDatabase from "@/src/config/mongodbConnection";
import Category from "@/src/models/category.models";
import SubCategory from "@/src/models/subCategory.models";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const reqBody = await req.json();
  try {
    // category are validation
    if (reqBody?.name === "") {
      return NextResponse.json({ message: "category name field are requied" });
    } else if (reqBody?.categoryID === "" || !reqBody?.categoryID) {
      return NextResponse.json({
        message: "categoryId are requied",
      });
    }

    // already category exist
    const namedEmpty = reqBody.name.trim();
    await connectDatabase("Sub Category");
    const categoryExist = await SubCategory.findOne({
      name: reqBody.name,
    });
    if (categoryExist?.name === namedEmpty) {
      return NextResponse.json({ message: "Category name are already exist" });
    }

    const findCategory = await Category.findById({ _id: reqBody.categoryID });

    const sid = await generateUniqueID(SubCategory, "sid", "CAT");
    // save category
    const newCategory = new SubCategory({
      name: reqBody.name,
      categoryID: reqBody.categoryID,
      catName: findCategory?.name,
      sid: sid
    });
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
    await connectDatabase("Sub Category");
    const categories = await SubCategory.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json();
  }
}
