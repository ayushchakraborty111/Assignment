const User = require('../models/user');
const Discussion = require("../models/discuss");

const searchUsers = async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({ name: { $regex: query, $options: 'i' } }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchDiscussions = async (req, res) => {
    const { query } = req.query;
    try {
        const discussions = await Discussion.find({ text: { $regex: query, $options: 'i' } });
        res.json(discussions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    searchUsers,
    searchDiscussions
}
