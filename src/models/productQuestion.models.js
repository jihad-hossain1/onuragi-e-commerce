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
      required: true,
    },
    user: {
      type: userType,
      required: true,
    },
    replies: [
      {
        content: {
          type: String,
          required: true,
        },
        user: {
          type: userType,
          required: true,
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
