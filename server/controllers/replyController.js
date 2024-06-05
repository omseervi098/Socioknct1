import environment from "../config/environment.js";
import { Reply } from "../models/Reply.js";
import { Comment } from "../models/Comment.js";
import axios from "axios";
export const createReply = async (req, res) => {
  try {
    const { commentId, postId, content } = req.body;
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
    //emit the reply to the websocket server
    const resp = await axios.post(environment.webSocketUrl + "/api/v1/reply", {
      reply: reply,
      type: "new",
    });
    return res
      .status(200)
      .json({ message: "Reply created successfully", reply });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const editReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    if (reply.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { content } = req.body;
    reply.text = content;
    await reply.populate("user", "name avatar bio");
    await reply.save();
    //emit the reply to the websocket server
    const resp = await axios.post(environment.webSocketUrl + "/api/v1/reply", {
      reply: reply,
      type: "edit",
    });

    return res
      .status(200)
      .json({ message: "Reply updated successfully", reply });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { commentId } = req.body;
    const reply = await Reply.findByIdAndDelete(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    // console.log(reply.user.toString(), req.user._id.toString());
    if (reply.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //make sure to remove the reply from the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.replies = comment.replies.filter((r) => r.toString() !== replyId);
    await comment.save();
    //emit the reply to the websocket server
    const resp = await axios.post(environment.webSocketUrl + "/api/v1/reply", {
      reply: reply,
      type: "delete",
    });

    return res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
