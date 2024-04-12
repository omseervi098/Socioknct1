export const createComment = async (req, res) => {
  try {
    const { user, post, content } = req.body;
    const newComment = new Comment({
      user,
      post,
      content,
    });
    await newComment.save();
    return res
      .status(201)
      .json({ message: "Comment created successfully", newComment });
  } catch (error) {
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
