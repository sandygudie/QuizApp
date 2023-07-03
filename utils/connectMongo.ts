import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
 
const connectMongo = async () => mongoose.connect(MONGODB_URI);

export default connectMongo;
