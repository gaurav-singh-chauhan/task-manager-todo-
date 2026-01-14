const taskModel = require("../models/task.model");

const getAllTasks = async (userId) => {
  const tasks = await taskModel.findAll({ where: { userId: userId } });
  return tasks;
};

const create = async (title, description, id) => {
  const task = await taskModel.create({
    title,
    description,
    userId: id,
  });
  return task;
};

const edit = async (newTitle, newDescription, taskId, id) => {
  const task = await taskModel.findOne({
    where: { id: taskId, userId: id },
  });
  if (!task) {
    throw new Error("Task not found");
  }
  task.title = newTitle;
  task.description = newDescription;
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

const getTask = async (taskId) => {
  try{
    const task = await taskModel.findByPk(taskId);
    if(!task){
      return task;
    }
    return task;
  } catch(err){
    console.log(err.message);
  }
};

module.exports = {
  create,
  edit,
  deleteTask,
  getAllTasks,
  getTask
};
