import mongoose, { Schema, models } from "mongoose";
import connectDatabase from "../config/mongodbConnection";

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

const replySchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: userType,
      required: true,
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
