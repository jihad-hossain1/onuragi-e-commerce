import mongoose, { Schema, models } from "mongoose";


// await connectDatabase("Product Question");

const userType = {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
};

const productQuestionSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [500, "Content cannot be more than 500 characters"],
    },
    user: {
      type: userType,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
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
