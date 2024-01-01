import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const password = process.env.MONGO_PASSWORD || "";
const URI = process.env.MONGO_URI || "";

const DB = URI.replace("<password>", password);

async function connectDB() {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Database failed to connect`);
    console.error(err);
  }
}

export default connectDB;
