const Project = require("../models/Project");
const Task = require("../models/Task");

exports.getDashboardStats = async (req, res) => {
    try {
        const owner = req.user._id;

        const totalProjects = await Project.countDocuments({
            owner
        });

        const totalTasks = await Task.countDocuments({
            owner
        });

        const todo = await Task.countDocuments({
            owner,
            status: "todo"
        });

        const inProgress = await Task.countDocuments({
            owner,
            status: "in-progress"
        });

        const done = await Task.countDocuments({
            owner,
            status: "done"
        });

        const overdue = await Task.countDocuments({
            owner,
            dueDate: { $lt: new Date() },
            status: { $ne: "done" }
        });

        res.json({
            totalProjects,
            totalTasks,
            todo,
            inProgress,
            done,
            overdue
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};