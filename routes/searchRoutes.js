const express = require('express');
const { searchUsers, searchDiscussions } = require('../controllers/search');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/users', auth, searchUsers);
router.get('/discussions', auth, searchDiscussions);

module.exports = router;
