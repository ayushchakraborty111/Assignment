const mongoose = require('mongoose');

const DiscussSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    image_url: { type: String },
    tags: [String],
    view_count: { type: Number, default: 0 },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: true,
  }
);

const Discussion = mongoose.model('Discussion', DiscussSchema);
module.exports = Discussion;