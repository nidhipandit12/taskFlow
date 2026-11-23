const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const {
    getTasks,
    createTask
} = require("../controllers/taskController");

router.use(protect);

router.route("/")
    .get(getProjects)
    .post(createProject);

router.route("/:id")
    .put(updateProject)
    .delete(deleteProject);

router.route("/:id/tasks")
    .get(getTasks)
    .post(createTask);

module.exports = router;