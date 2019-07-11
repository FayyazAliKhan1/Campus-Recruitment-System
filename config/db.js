import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI");
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("Mongo DB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;
