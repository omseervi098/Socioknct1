import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    video: {
      type: String,
    },
    audio: {
      type: String,
    },
    document: {
      type: String,
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //Reference to comments
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    //Reference to likes
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Post = mongoose.model("Post", postSchema);
