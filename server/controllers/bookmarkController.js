import { Bookmark } from "../models/Bookmark.js";

export const addBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    // Check if post is already bookmarked and if not then add it to bookmark
    const bookmark = await Bookmark.findOne({ user: user._id, post: id });
    if (bookmark) {
      return res.status(400).json({ message: "Post already bookmarked" });
    }
    const newBookmark = new Bookmark({
      user: user._id,
      post: id,
    });
    await newBookmark.save();
    return res.status(201).json({ message: "Bookmarked successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getBookmarkedPosts = async (req, res) => {
  try {
    const user = req.user;
    //get all Bookmarked Post
    const bookmarkedPosts = await Bookmark.find({ user: user._id }).populate([
      {
        path: "post",
        populate: [
          {
            path: "user",
            select: "-password",
          },
          {
            path: "likes",
            populate: {
              path: "user",
              select: "name avatar bio",
            },
          },
          {
            path: "poll",
          },
          {
            path: "comments",
            populate: [
              {
                path: "replies",
                populate: [
                  { path: "user", select: "name avatar bio" },
                  { path: "likes" },
                ],
              },
              {
                path: "user",
                select: "name avatar bio",
              },
              {
                path: "likes",
              },
            ],
          },
        ],
      },
    ]);
    const posts = bookmarkedPosts.map((bookmark) => bookmark.post);
    return res.status(200).json({ posts: posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const removeBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    // Check if post is bookmarked and if yes then remove it from bookmark
    const bookmark = await Bookmark.findOne({ user: user._id, post: id });
    if (!bookmark) {
      return res.status(400).json({ message: "Post not bookmarked" });
    }
    await Bookmark.findByIdAndDelete(bookmark._id);
    return res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
