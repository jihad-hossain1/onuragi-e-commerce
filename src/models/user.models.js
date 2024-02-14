import mongoose, { Schema } from "mongoose";
// import connectDatabase from "../config/mongodbConnection";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
console.log("<----*** MONGODB CONNECTION OK ***----->");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
