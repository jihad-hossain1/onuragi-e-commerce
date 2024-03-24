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
        content: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        questionID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductQuestion",
        },
      },
    ],
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const ProductQuestion =
  models.ProductQuestion ||
  mongoose.model("ProductQuestion", productQuestionSchema);

export default ProductQuestion;
