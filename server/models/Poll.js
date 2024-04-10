import mongoose from "mongoose";
const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        votes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Poll = mongoose.model("Poll", pollSchema);
