import mongoose, { Schema, models } from "mongoose";

const lengthWithStockType = Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSpecificationSchema = new Schema(
  {
    care: [String],

    febric: [String],

    sleeve: String,

    valueAddition: String,

    coller_Neck: String,

    sideCut: String,

    lengthWithStock: [lengthWithStockType],

    productDetailsID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
    },
  },
  { timestamps: true }
);

const ProductSpecification =
  models.ProductSpecification ||
  mongoose.model("ProductSpecification", productSpecificationSchema);

export default ProductSpecification;
