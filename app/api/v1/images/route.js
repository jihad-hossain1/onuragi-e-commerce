import Image from "@/src/models/image.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const requestFromBody = await request.json();

    const validJson = validateJSON(requestFromBody);

    if (validJson === true) {
      const { productID, urls } = requestFromBody;

      if (!mongoose.Types.ObjectId.isValid(productID)) {
        return NextResponse.json({
          message: "your provide id is not valid",
        });
      }

      if (urls.length == 0) {
        return NextResponse.json({
          message: "your image urls are not found",
        });
      }
      
      await connectDatabase();
      // new urls
      const newUrls = new Image({ productID, urls });

      const saveImage = await newUrls.save();

      return NextResponse.json(
        { message: "urls are saved on database", saveImage },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "your are not provide a valid json: ", validJson },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
