import mongoose from "mongoose";

const connectDatabase = async (title) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connect on database for ${title}`);
  } catch (error) {
    console.log("error connect to database: ", error);
  }
};

export default connectDatabase;
