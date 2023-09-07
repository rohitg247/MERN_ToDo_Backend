// todo-backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rohitg247:3z1DtgsRAjFONK7l@cluster0.e3rejnk.mongodb.net/?retryWrites=true&w=majority', {
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

