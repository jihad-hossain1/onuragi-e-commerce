import mongoose, { Schema, models } from "mongoose";

// await connectDatabase("Product Image");

const posterSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Poster = models.Poster || mongoose.model("Poster", posterSchema);

export default Poster;
