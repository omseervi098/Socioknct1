import { Post } from "../models/Post.js";
export const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { type } = req.body;
    if (type == "text") {
      const { user, content } = req.body;
      const newPost = new Post({
        user,
        text: content,
      });
      await newPost.save();
      return res
        .status(201)
        .json({ message: "Post created successfully", newPost });
    } else if (type == "image") {
      const { user, images, content } = req.body;
      const newPost = new Post({
        user,
        images,
        text: content,
      });
      await newPost.save();
      return res
        .status(201)
        .json({ message: "Post created successfully", newPost });
    } else if (type == "video") {
      const { user, video, content } = req.body;
      const newPost = new Post({
        user,
        video,
        text: content,
      });
      await newPost.save();
      return res
        .status(201)
        .json({ message: "Post created successfully", newPost });
    } else if (type == "audio") {
      const { user, audio, content } = req.body;
      const newPost = new Post({
        user,
        audio,
        text: content,
      });
      await newPost.save();
      return res
        .status(201)
        .json({ message: "Post created successfully", newPost });
    } else if (type == "document") {
      const { user, document, content } = req.body;
      const newPost = new Post({
        user,
        document,
        text: content,
      });
      await newPost.save();
      return res
        .status(201)
        .json({ message: "Post created successfully", newPost });
    } else {
      return res.status(400).json({ message: "Invalid post type" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, images, video, audio, document } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.text = content;
    post.images = images;
    post.video = video;
    post.audio = audio;
    post.document = document;
    await post.save();

    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.remove();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
