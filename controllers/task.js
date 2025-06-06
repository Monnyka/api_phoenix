const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomerError } = require("../error/custom-error");

const getAllItems = asyncWrapper(async (req, res) => {
  const filter = { createdBy: req.user.userId };

  if (req.query.completed === "true") {
    filter.completed = true;
  } else if (req.query.completed === "false") {
    filter.completed = false;
  }

  const limit = parseInt(req.query.limit, 10) || 10; // Default limit is 10
  const offset = parseInt(req.query.offset, 10) || 0; // Default offset is 0

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

const createTaskBulk = asyncWrapper(async (req, res) => {
  const tasks = req.body;
  //validate the request body
  if (!Array.isArray(req.body) || req.body.length == 0) {
    return res.status(400).json(next(createCustomerError("Empty Array")));
  }
  const createTask = await Task.insertMany(tasks, { ordered: false });
  res.status(201).json(tasks);
});

const getTask = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: taskID },
  } = req;
  const task = await Task.findOne({ _id: taskID, createdBy: userId });
  if (!task) {
    return next(createCustomerError(`There is no task with the id: ${taskID}`));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: taskID },
  } = req;
  const task = await Task.findOneAndDelete({ _id: taskID, createdBy: userId });
  if (!task) {
    return next(createCustomerError(`There is no task with the id: ${taskID}`));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: taskID },
  } = req;
  const task = await Task.findByIdAndUpdate(
    { _id: taskID, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    return next(createCustomerError(`There is no task with the id: ${taskID}`));
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
