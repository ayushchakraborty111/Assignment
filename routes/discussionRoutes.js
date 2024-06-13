const express = require('express');
const { auth } = require('../middleware/auth');
const { createDiscussion, updateDiscussion, deleteDiscussion, getAllDiscussions, getDiscussionsByTag, searchDiscussions } = require('../controllers/discuss');

const router = express.Router();

router.post("/", auth, createDiscussion);
router.put("/:discussionId", auth, updateDiscussion);
router.delete("/:discussionId", auth, deleteDiscussion);
router.get('/', auth, getAllDiscussions);
router.get('/tags/:tag',auth, getDiscussionsByTag);
router.get("/search", auth, searchDiscussions);

module.exports = router;
