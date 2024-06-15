import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(`connection successful`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDatabase;
