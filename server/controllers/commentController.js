import { text } from "express";
import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";
import axios from "axios";
import environment from "./../config/environment.js";
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = await Comment.create({
      user: req.user._id,
      post: postId,
      text: content,
    });
    //populate the user field
    await newComment.populate("user", "name avatar bio");
    post.comments.push(newComment._id);
    await post.save();
    //emit the comment to the websocket server
    const resp = await axios.post(
      environment.webSocketUrl + "/api/v1/comment",
      {
        comment: newComment,
        type: "new",
      }
    );
    return res
      .status(200)
      .json({ message: "Comment created successfully", newComment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    comment.text = content;
    await comment.save();
    await comment.populate([
      {
        path: "user",
        select: "name avatar bio",
      },
      {
        path: "likes",
      },
      {
        path: "replies",
        populate: [
          {
            path: "user",
            select: "name avatar bio",
          },
          {
            path: "likes",
          },
        ],
      },
    ]);
    const resp = await axios.post(
      environment.webSocketUrl + "/api/v1/comment",
      {
        comment: comment,
        type: "edit",
      }
    );

    return res
      .status(200)
      .json({ message: "Comment updated successfully", comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comments = post.comments.filter(
      (comment) => comment.toString() !== req.params.id
    );
    await post.save();
    const resp = await axios.post(
      environment.webSocketUrl + "/api/v1/comment",
      {
        comment: comment,
        type: "delete",
      }
    );

    return res
      .status(200)
      .json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
