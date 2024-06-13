module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/social_app',
    secretOrKey: process.env.SECRET_OR_KEY || 'test'
};
