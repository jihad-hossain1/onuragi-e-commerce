import mongoose, { Schema, models } from "mongoose";


import connectDatabase from "../config/mongodbConnection";

// await connectDatabase("Product Image");

const urlType = Schema({
  image: {
    type: String,
    required: [true, "url link require"],
  },
});

const imageSchema = new Schema({
  urls: [urlType],

  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Image = models.Image || mongoose.model("Image", imageSchema);

export default Image;
