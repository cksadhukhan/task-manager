const express = require("express");
const {
  getAllTasks,
  getTaskWithPriority,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers");

const router = express.Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/priority/:level", getTaskWithPriority);

router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

module.exports = router;
