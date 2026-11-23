const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    updateTask,
    updateTaskStatus,
    deleteTask
} = require("../controllers/taskController");

router.use(protect);

router.put("/:id", updateTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;