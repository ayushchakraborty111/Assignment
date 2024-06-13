const Discussion = require("../models/discuss");

const createDiscussion = async (req, res) => {
  const { text, image_url, hashtags } = req.body;
  const user_id = req.user.id;
  try {
    const newDiscussion = new Discussion({
      user_id,
      text,
      image_url,
      hashtags,
    });
    const discussion = await newDiscussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const { text, image_url, hashtags } = req.body;
  try {
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      discussionId,
      { text, image_url, hashtags },
      { new: true }
    );
    res.json(updatedDiscussion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  try {
    await Discussion.findByIdAndDelete(discussionId);
    res.json({ message: "Discussion deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDiscussionsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const discussions = await Discussion.find({ hashtags: tag });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchDiscussions = async (req, res) => {
  const { query } = req.query;
  try {
    const discussions = await Discussion.find({
      text: { $regex: query, $options: "i" },
    });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getAllDiscussions,
  getDiscussionsByTag,
  searchDiscussions
};
