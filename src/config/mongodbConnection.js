import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.Promise = global.Promise;
    console.log("<----*** MONGODB CONNECTION OK ***----->");
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
