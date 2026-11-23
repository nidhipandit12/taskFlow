const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            project: project._id,
            owner: req.user._id
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET TASKS WITH FILTERS AND SEARCH
exports.getTasks = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const { status, priority, search } = req.query;

        const filter = {
            project: project._id,
            owner: req.user._id
        };

        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        const tasks = await Task.find(filter).sort({
            createdAt: -1
        });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const allowedFields = [
            "title", "description", "status", "priority", "dueDate"
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                task[field] = req.body[field];
            }
        });

        await task.save();

        res.json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CHANGE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["todo", "in-progress", "done"].includes(status)) {
            return res.status(400).json({
                message: "Invalid task status"
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user._id
            },
            { status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};