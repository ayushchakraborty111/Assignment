const express = require('express');
const { signUp, login, getUsers, searchUser, followUser, unfollowUser } = require('../controllers/users');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/', auth, getUsers);
router.get('/:name', auth, searchUser);
router.post('/:userId/follow', auth, followUser);
router.post('/:userId/unfollow', auth, unfollowUser);

module.exports = router;
