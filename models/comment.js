const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    discussion_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
