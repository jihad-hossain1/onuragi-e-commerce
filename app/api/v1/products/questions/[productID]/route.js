// export async function GET()

// const getAllReviews = async (req, res) => {
//   // const id = req.body?.taskId;
//   const id = req.params?.productId;

//   console.log(id);

//   try {
//     if (id) {
//       const reviews = await Review.find({ productId: id }).sort({
//         createdAt: "desc",
//       });
//       res.json(reviews);
//     } else {
//       res
//         .status(404)
//         .json({ message: "reviewId and productId are not match " });
//     }
//   } catch (error) {
//     res
//       .status(401)
//       .json({ message: "problem with product fetch", error: error });
//   }
// };

import Product from "@/src/models/product.models";
import ProductQuestion from "@/src/models/productQuestion.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { productID } = params;

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return NextResponse.json(
        { message: "your provide id is not valid" },
        { status: 400 }
      );
    }

    const findProduct = await Product.findOne({ _id: productID });

    if (findProduct) {
      const productQuestions = await ProductQuestion.find({
        productID: productID,
      }).sort({ createdAt: "desc" });

      return NextResponse.json({ productQuestions }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "product are not found" },
        { status: 400 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
