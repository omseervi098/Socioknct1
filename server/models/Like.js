import mongoose from "mongoose";
const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      require: true,
      enum: ["post", "comment", "reply"],
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model("Like", likeSchema);
