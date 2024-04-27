import { Poll } from "../models/Poll.js";
import { Post } from "../models/Post.js";
import { getIO } from "../config/socket.js";
export const createPost = async (req, res) => {
  try {
    const { type } = req.body;
    if (type == "text") {
      const { user, content } = req.body;
      const newPost = new Post({
        user,
        text: content,
      });

      await newPost.save();
      await newPost.populate("user");
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
      await newPost.populate("user");
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
      await newPost.populate("user");
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
      await newPost.populate("user");
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
      await newPost.populate("user");
      return res
        .status(201)
        .json({ message: "Post created successfully", newPost });
    } else if (type == "poll") {
      const { user, question, options, content } = req.body;
      const newPoll = new Poll({
        question,
        options: options.map((option) => ({ text: option })),
      });
      await newPoll.save();
      const newPost = new Post({
        user,
        poll: newPoll._id,
        text: content,
      });
      await newPost.save();
      await newPost.populate("user");
      await newPost.populate("poll");
      return res
        .status(201)
        .json({ message: "Post created successfully", newPost });
    } else {
      return res.status(400).json({ message: "Invalid post type" });
    }
  } catch (error) {
    console.log(error);
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
    //check if user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(id);
    // delete poll if it exists
    if (post.poll) {
      await Poll.findByIdAndDelete(post.poll._id);
    }
    //delete posts id from user's posts array

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate("poll")
      .sort({ createdAt: -1 });
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

export const votePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;
    console.log("Vote Post", id, optionId);
    const post = await Post.findById(id).populate("poll");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.poll) {
      return res.status(400).json({ message: "Post is not a poll" });
    }
    // check if user has already voted
    const voted = post.poll.options.some((opt) =>
      opt.votes.includes(req.user._id)
    );
    if (voted) {
      return res.status(400).json({ message: "You have already voted" });
    }
    const poll = post.poll;
    const optionIndex = poll.options.findIndex(
      (opt) => opt._id.toString() === optionId.toString()
    );
    if (optionIndex === -1) {
      return res.status(400).json({ message: "Invalid option" });
    }
    poll.options[optionIndex].votes.push(req.user._id);
    poll.totalVotes += 1;
    await poll.save();
    await post.populate("user");
    try {
      const io = getIO();
      console.log("Emitting poll");
      io.emit("poll", post);
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({ message: "Voted successfully", poll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
