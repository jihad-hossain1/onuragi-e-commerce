import mongoose, { Schema, models } from "mongoose";

const productQuestionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    productDetailsID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
    },
  },
  { timestamps: true }
);

const ProductQuestion =
  models.ProductQuestion ||
  mongoose.model("ProductQuestion", productQuestionSchema);

export default ProductQuestion;
