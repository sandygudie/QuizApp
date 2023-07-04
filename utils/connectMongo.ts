import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const db = {
  mongoose,
};

const MONGODB_URI: string | any = process.env.NEXT_PUBLIC_MONGODB_URI;

const connectToDB = async () => {
  await db.mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};

const disconnectDB = async () => {
  await db.mongoose.disconnect();
};

export { connectToDB, disconnectDB };
