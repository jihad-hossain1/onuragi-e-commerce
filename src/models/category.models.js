import mongoose, { Schema, models } from "mongoose";



const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sid: {
    type: String,
    required: true,
    unique: true,
  },
 
});

const Category =
  models.Category || mongoose.model("Category", productCategorySchema);

export default Category;
