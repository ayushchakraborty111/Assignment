const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretOrKey } = require('../config');

const signUp = async (req, res) => {
  const { email, password, name, phone } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this phone or email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, phone, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully" }); 
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const login = async(req, res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const payload = { id: user.id, name: user.name };
        const token = jwt.sign(payload, secretOrKey, { expiresIn: '1h' });
        
        res.json({ token: `Bearer ${token}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchUser = async (req, res) => {
    const { name } = req.params;
    try {
        const users = await User.find({ name: { $regex: name, $options: 'i' } }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const followUser = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    try {
        await User.findByIdAndUpdate(userId, { $addToSet: { followers: currentUserId } });
        res.json({ message: 'Followed user' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const unfollowUser = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    try {
        await User.findByIdAndUpdate(userId, { $pull: { followers: currentUserId } });
        res.json({ message: 'Unfollowed user' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
  signUp,
  login,
  getUsers,
  searchUser,
  followUser,
  unfollowUser
};