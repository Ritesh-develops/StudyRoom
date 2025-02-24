import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected", connect.connection.host);
  } catch (error) {
    console.log("Error connecting to db", error.message);
    process.exit(1);
  }
}