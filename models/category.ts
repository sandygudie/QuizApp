const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: [],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

categorySchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    // delete returnedObject.passwordHash;
  },
});

export const User = mongoose.model("User", categorySchema);
