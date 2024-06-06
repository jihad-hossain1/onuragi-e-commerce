import mongoose, { Schema, models } from "mongoose";

// await connectDatabase("Product Image");

const offerBannerSchema = new Schema({
  image: {
    type: String,
    required: [true, "url link require"],
  },
  title: {
    type: String,
    required: [true, "title link require"],
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const OfferBanner =
  models.OfferBanner || mongoose.model("OfferBanner", offerBannerSchema);

export default OfferBanner;
