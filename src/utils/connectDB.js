import mongoose from "mongoose";

export default async function Connect() {
  try {
    if (mongoose.connections[0].readyState) return;
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
    return error;
  }
}
