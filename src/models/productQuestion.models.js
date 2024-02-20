import mongoose, { Schema, models } from "mongoose";


mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
console.log("<----*** MONGODB ProductQuestion CONNECTION OK ***----->");

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
