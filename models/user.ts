import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 5,
      required: true,
      unique: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
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

export const User = models.User || model("User", userSchema);
export default User;
