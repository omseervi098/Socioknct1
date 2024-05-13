import { text } from "express";
import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";

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
    console.log(postId, content, req.user._id);
    const newComment = await Comment.create({
      user: req.user._id,
      post: postId,
      text: content,
    });
    //populate the user field
    await newComment.populate("user", "name avatar bio");

    post.comments.push(newComment._id);
    await post.save();
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
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
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
    const comment = await Comment.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
