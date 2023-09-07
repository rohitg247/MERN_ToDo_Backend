// todo-backend/app.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGODB_URI;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define routes for CRUD operations

const todoRoutes = require('./routes/todo');

app.use('/api/todos', todoRoutes);

// You'll create these routes in the next steps

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

