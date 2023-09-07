// todo-backend/routes/todo.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a new TODO item
router.post('/', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const todo = new Todo({ title, description, status });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ error: error.message });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'Server error' });
        }
    }
});

// Get all TODO items
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a TODO item by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );
        res.status(200).json(updatedTodo);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ error: error.message });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'Server error' });
        }
    }
});

// Delete a TODO item by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
