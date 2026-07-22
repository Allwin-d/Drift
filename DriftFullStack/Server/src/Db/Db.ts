import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const mongoURL = process.env.MONGO_DB_CREDENTIALS ?? "";
    if (!mongoURL) {
      console.log("Mongo DB credentials URL is missing");
    } else {
      await mongoose.connect(mongoURL);
      console.log("Database Connected Successfully");
    }
  } catch (err) {
    console.error("Failed to Connect to Database");
  }
};

export default connectToDb;
