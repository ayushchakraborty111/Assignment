const Discussion = require('../models/discuss');
const Comment = require('../models/comment');

const likeDiscussion = async (req, res) => {
    const { discussionId } = req.params;
    const user_id = req.user.id;
    try {
        await Discussion.findByIdAndUpdate(discussionId, { $addToSet: { likes: user_id } });
        res.json({ message: 'Liked discussion' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const commentOnDiscussion = async (req, res) => {
    const { discussionId } = req.params;
    const { text } = req.body;
    const user_id = req.user.id;
    try {
        const newComment = new Comment({ discussion_id: discussionId, user_id, text });
        const comment = await newComment.save();
        await Discussion.findByIdAndUpdate(discussionId, { $addToSet: { comments: comment._id } });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        await Comment.findByIdAndDelete(commentId);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const likeComment = async (req, res) => {
    const { commentId } = req.params;
    const user_id = req.user.id;
    try {
        await Comment.findByIdAndUpdate(commentId, { $addToSet: { likes: user_id } });
        res.json({ message: 'Liked comment' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
  likeDiscussion,
  updateComment,
  commentOnDiscussion,
  deleteComment,
  likeComment
};
