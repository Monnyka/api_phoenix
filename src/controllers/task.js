const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

const getAllItems = asyncWrapper(async (req, res) => {
  const filter = {};

  // Only filter by user if 'all' query param is not set to true
  if (req.query.all !== "true") {
    filter.createdBy = req.user.userId;
  }

  if (req.query.completed === "true") {
    filter.completed = true;
  } else if (req.query.completed === "false") {
    filter.completed = false;
  }

  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  const tasks = await Task.find(filter)
    .sort("createdAt")
    .limit(limit)
    .skip(offset);

  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const createTaskBulk = asyncWrapper(async (req, res, next) => {
  if (!Array.isArray(req.body) || req.body.length === 0) {
    return next(createCustomError("Empty array or invalid request body", 400));
  }

  const tasks = req.body.map((task) => ({
    ...task,
    createdBy: req.user.userId,
  }));

  const createdTasks = await Task.insertMany(tasks, { ordered: false });
  res.status(201).json({ tasks: createdTasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findById(taskID);

  if (!task) {
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete(taskID);

  if (!task) {
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate(taskID, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllItems,
  createTask,
  createTaskBulk,
  getTask,
  deleteTask,
  updateTask,
};
