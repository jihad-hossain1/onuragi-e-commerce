import mongoose, { Schema, models } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
console.log("<----*** MONGODB Image CONNECTION OK ***----->");

const urlType = Schema({
  url: {
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
