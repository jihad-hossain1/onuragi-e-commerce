import mongoose, { Schema, models } from "mongoose";

// await connectDatabase("Product Image");

const bannerSchema = new Schema({
  image: {
    type: String,
    required: [true, "url link require"],
  },
  title: {
    type: String,
    required: [true, "title link require"],
  },

  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Banner = models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
