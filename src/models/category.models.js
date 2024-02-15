import mongoose, { Schema, models } from "mongoose";


mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
console.log("<----*** MONGODB CONNECTION OK ***----->");

const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

const Category =
  models.Category || mongoose.model("Category", productCategorySchema);

export default Category;
