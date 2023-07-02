const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    score: {
      type: Number,
    },
    attempts: { type: Number },
    recentScore: { type: Number },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

categorySchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Category = mongoose.model("Category", categorySchema);
