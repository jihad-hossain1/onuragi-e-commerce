import mongoose, { Schema, models } from "mongoose";


mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
console.log("<----*** MONGODB products details CONNECTION OK ***----->");

const sizeType = new Schema({
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const productDetailsSchema = new Schema(
  {
    sizes: [sizeType],

    sizeGuide: {
      type: String,
      required: true,
    },

    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],

    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    quantity: {
      type: Number,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductDetail =
  models.ProductDetail || mongoose.model("ProductDetail", productDetailsSchema);

export default ProductDetail;
