require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const searchRoutes = require('./routes/searchRoutes');
const { mongoURI } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/users', userRoutes);
app.use('/discussions', discussionRoutes);
app.use('/interactions', interactionRoutes);
app.use('/search', searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
