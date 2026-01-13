const taskService = require("../services/task.service");

const getAllTasks = async (req, res) => {
  const { id } = req.user;
  try {
    const tasks = await taskService.getAllTasks(id);
    if (tasks.length === 0) {
      return res.status(200).json({ message: "User doesn't have any task" });
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.user;

  try {
    const task = await taskService.create(title, description, id);
    res.status(200).json({ message: "Task created", task });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { id } = req.user;
  const { newTitle, newDescription } = req.body;

  try {
    const task = await taskService.edit(newTitle, newDescription, taskId, id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  try {
    const task = await taskService.deleteTask(taskId, userId);
    if (task) {
      res.status(200).json({ message: "Task deleted" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
};
