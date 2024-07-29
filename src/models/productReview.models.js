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
      max: 300
    },
    user: {
      type: userType,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id must be required"],
    },
    rating: {
      type: Number,
      default: 5
    },
  },
  { timestamps: true }
);

const ProductReview =
  models.ProductReview || mongoose.model("ProductReview", productReviewSchema);

export default ProductReview;
