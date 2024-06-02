import mongoose, { Schema, models } from "mongoose";
import connectDatabase from "../config/mongodbConnection";

// await connectDatabase("Product Reply");

const replySchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductReview",
    },
    questionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductQuestion",
    },
  },
  { timestamps: true }
);

const Reply = models.Reply || mongoose.model("Reply", replySchema);

export default Reply;
