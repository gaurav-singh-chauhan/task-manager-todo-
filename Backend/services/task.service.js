const taskModel = require("../models/task.model");

const getAllTasks = async (userId) => {
  const tasks = await taskModel.findAll({ where: { userId: userId } });
  if(!tasks){
    return false;
  }
  return tasks;
};

const create = async (title, id) => {
  const task = await taskModel.create({
    title,
    userId: id,
  });
  return task;
};

const edit = async (taskId, userId, newTitle) => {
  const task = await taskModel.findOne({
    where: { id: taskId },
  });
  if (!task) {
    throw new Error("Task not found");
  }
  task.title = newTitle;
  await task.save();
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await taskModel.findOne({
    where: { id: taskId },
  });
  if (!task) {
    throw new Error("Task not found");
  }
  await task.destroy();
  return true;
};

module.exports = {
  create,
  edit,
  deleteTask,
  getAllTasks
};
