const Project = require("../models/Project");
const Task = require("../models/Task");

// CREATE PROJECT
exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                message: "Project title is required"
            });
        }

        const project = await Project.create({
            title,
            description,
            owner: req.user._id
        });

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET PROJECTS
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            owner: req.user._id
        }).sort({ createdAt: -1 });

        res.json(projects);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
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

        project.title = req.body.title ?? project.title;
        project.description = req.body.description ?? project.description;

        await project.save();

        res.json(project);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE PROJECT + TASKS
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        await Task.deleteMany({
            project: project._id,
            owner: req.user._id
        });

        res.json({
            message: "Project and its tasks deleted"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};