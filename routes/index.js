const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const discussionRoutes = require('./discussionRoutes');
const interactionRoutes = require('./interactionRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/users', userRoutes);
router.use('/discussions', discussionRoutes);
router.use('/interactions', interactionRoutes);
router.use('/search', searchRoutes);

module.exports = router;