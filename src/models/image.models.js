import mongoose, { Schema, models } from "mongoose";

const urlType = Schema({
  url: {
    type: String,
    required: true,
  },
});

const imageSchema = new Schema(
  {
    urls: [urlType],

    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    productDetailsID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
    },
  },
  { timestamps: true }
);

const Image = models.Image || mongoose.model("Image", imageSchema);

export default Image;
