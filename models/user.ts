import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  createdDate: Date,
  category: [
    {
      name: String,
      score: Number,
      attempts: Number,
      recentScore: Number,
      lastPlayedDate: Date,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  userNo:Number
});

userSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const User = models.User || model("User", userSchema);
export default User;
