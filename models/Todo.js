// todo-backend/models/Todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model('Todo', todoSchema);
