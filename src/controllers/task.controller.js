// In-memory data store
let tasks = [];

exports.getAllTasks = (req, res) => {
  const completed = req.query.completed;
  let filteredTasks = [...tasks];

  if (
    completed !== undefined &&
    (completed === "true" || completed === "false")
  ) {
    filteredTasks = filteredTasks.filter(
      (task) => task.completed.toString() === completed
    );
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let next = {};
  let previous = {};

  if (endIndex < filteredTasks.length) {
    next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    previous = {
      page: page - 1,
      limit: limit,
    };
  }

  const results = filteredTasks.slice(startIndex, endIndex);

  if (tasks.length == 0) {
    return res.json({
      data: results,
    });
  }

  res.json({
    data: results,
    next,
    previous,
  });
};

exports.getTaskWithPriority = (req, res) => {
  const level = req.params.level.toLowerCase();
  if (!["low", "medium", "high"].includes(level)) {
    return res.status(400).send({ message: "Invalid priority level" });
  }

  const tasksByPriority = tasks.filter((task) => task.priority === level);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let next = {};
  let previous = {};

  if (endIndex < tasksByPriority.length) {
    next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    previous = {
      page: page - 1,
      limit: limit,
    };
  }

  const results = tasksByPriority.slice(startIndex, endIndex);

  if (tasksByPriority.length == 0) {
    return res.json({
      data: results,
    });
  }

  res.json({
    data: results,
    next,
    previous,
  });
};

exports.getTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task)
    return res.status(404).send({
      message: `Task with id ${taskId} not found`,
      data: null,
    });
  res.json({
    data: task,
  });
};

exports.createTask = (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .send({ message: "Title is required and must be a string" });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).send({ message: "Description must be a string" });
  }

  if (completed === undefined || typeof completed !== "boolean") {
    return res
      .status(400)
      .send({ message: "Completed field is required and must be a boolean" });
  }

  if (priority) {
    if (
      typeof priority !== "string" ||
      !["low", "medium", "high"].includes(priority.toLowerCase())
    ) {
      return res
        .status(400)
        .send({ message: "Priority must be one of: low, medium, high" });
    }
  }

  const task = {
    id: tasks.length === 0 ? 1 : tasks[tasks.length - 1]?.id + 1,
    title,
    description,
    completed,
    priority: priority ?? "low",
    createdAt: Date.now(),
  };

  tasks.push(task);
  res.status(201).json({ message: "Task created successfully", data: task });
};

exports.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send({
      message: `Task with id ${taskId} not found`,
      data: null,
    });
  }

  const { title, description, completed, priority } = req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .send({ message: "Title is required and must be a string" });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).send({ message: "Description must be a string" });
  }

  if (completed === undefined || typeof completed !== "boolean") {
    return res
      .status(400)
      .send({ message: "Completed field is required and must be a boolean" });
  }

  if (priority) {
    if (
      typeof priority !== "string" ||
      !["low", "medium", "high"].includes(priority.toLowerCase())
    ) {
      return res
        .status(400)
        .send({ message: "Priority must be one of: low, medium, high" });
    }
  }

  const updatedTask = {
    id: taskId,
    title,
    description,
    completed,
  };
  tasks[taskIndex] = updatedTask;

  res.json({ message: "Task updated successfully", data: updatedTask });
};

exports.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send({
      message: `Task with id ${taskId} not found`,
      data: null,
    });
  }

  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({ message: `Task with id ${taskId} deleted successfully` });
};
