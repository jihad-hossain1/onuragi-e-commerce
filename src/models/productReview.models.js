import mongoose, { Schema, models } from "mongoose";

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

const productReviewSchema = new Schema(
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id must be required"],
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductReview =
  models.ProductReview || mongoose.model("ProductReview", productReviewSchema);

export default ProductReview;
