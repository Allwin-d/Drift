import mongoose from "mongoose";

const connectToDb = async () => {
  const mongoURL = process.env.MONGO_DB_CREDENTIALS;
  if (!mongoURL) {
    throw new Error("MongoDB connection URL is missing");
  }

  try {
    await mongoose.connect(mongoURL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Failed to connect to database", error);
    throw error;
  }
};

export default connectToDb;
