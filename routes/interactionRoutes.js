const express = require('express');
const { auth } = require('../middleware/auth');
const { likeDiscussion, commentOnDiscussion, updateComment, deleteComment, likeComment } = require('../controllers/userActivity');

const router = express.Router();

router.post('/:discussionId/like', auth, likeDiscussion);
router.post('/:discussionId/comment', auth, commentOnDiscussion);
router.put('/comments/:commentId', auth, updateComment);
router.delete('/comments/:commentId', auth, deleteComment);
router.post('/comments/:commentId/like', auth, likeComment);

module.exports = router;
