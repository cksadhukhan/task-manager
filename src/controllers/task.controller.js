// In-memory data store
let tasks = [];

exports.getAllTasks = (req, res) => {
  res.json({
    data: tasks,
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
  const { title, description, completed } = req.body;

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

  const task = {
    id: tasks.length === 0 ? 1 : tasks[tasks.length - 1]?.id + 1,
    title,
    description,
    completed,
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

  const { title, description, completed } = req.body;

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

  tasks = tasks.filter(task => task.id !== taskId);

  res.json({ message: `Task with id ${taskId} deleted successfully` });
};
