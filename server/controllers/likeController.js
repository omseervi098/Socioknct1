import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";
import { Reply } from "../models/Reply.js";
import { Like } from "../models/Like.js";
export const toggleLike = async (req, res) => {
  try {
    // -- /toggle/?id=123&type=Post
    const { id, type } = req.query;
    const user = req.user._id;
    let likeable, deleted;
    if (type === "post") {
      likeable = await Post.findById(id).populate("likes");
    } else if (type === "comment") {
      likeable = await Comment.findById(id).populate("likes");
    } else if (type === "reply") {
      likeable = await Reply.findById(id).populate("likes");
    }
    //check if the like exists
    const existingLike = await Like.findOne({
      user: user._id,
      likeable: id,
      onModel: type,
    });
    //if it exists then delete it
    if (existingLike) {
      await likeable.likes.pull(existingLike._id);
      await likeable.save();
      await existingLike.remove();
      deleted = true;
    } else {
      //else create a new like
      const newLike = await Like.create({
        user: user._id,
        likeable: id,
        onModel: type,
      });
      likeable.likes.push(newLike._id);
      await likeable.save();
    }
    res.status(200).json({ message: "Like toggled", deleted });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
