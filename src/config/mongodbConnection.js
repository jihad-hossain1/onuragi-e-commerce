import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect to mongodb");
  } catch (error) {
    console.log("error connect to database: ", error);
  }
};

export default connectDatabase;
