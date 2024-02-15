import mongoose, { Schema, models } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
console.log("<----*** MONGODB CONNECTION OK ***----->");

const productSubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const SubCategory =
  models.SubCategory || mongoose.model("SubCategory", productSubCategorySchema);

export default SubCategory;
