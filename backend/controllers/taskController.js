const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks });
})

// @desc    Set task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const task = await Task.create({
        user: req.user.id,
        text: req.body.text,
        dueDate: req.body.dueDate || null,
        checked: req.body.checked || false
    })

    res.status(201).json(task);
})

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedTask);
})

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    const deletedTask = await task.remove();

    res.status(200).json(deletedTask);
})

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
}