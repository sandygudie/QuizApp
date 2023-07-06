import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 5,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: [
      {
        name: String,
        attempts: Number,
        score: Number,
        recentScore: Number,
        updatedDate: Date,
      },
    ],
    image: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
