import { copyFileSync } from "fs";
import { Reply } from "../models/Reply.js";
import { Comment } from "../models/Comment.js";
export const createReply = async (req, res) => {
  try {
    const { commentId, postId, content } = req.body;
    console.log(commentId, postId, content);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const reply = await Reply.create({
      user: req.user._id,
      post: postId,
      comment: commentId,
      text: content,
    });
    //populate the user field
    await reply.populate("user", "name avatar bio");
    comment.replies.push(reply._id);
    await comment.save();
    return res
      .status(200)
      .json({ message: "Reply created successfully", reply });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
