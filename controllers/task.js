const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomerError } = require("../error/custom-error");

const getAllItems = asyncWrapper(async (req, res) => {
  const { completed } = req.query;
  let query = { createdBy: req.user.userId };

  if (completed !== undefined) {
    query.completed = completed === true;
  }
  const tasks = await Task.find({ query }).sort("createdAt");
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: taskID },
  } = req;
  const task = await Task.findOne({ _id: taskID, createdBy: userId });
  if (!task) {
    return next(createCustomerError("There is no task with the id: ${taskID}"));
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
    return next(createCustomerError("There is no task with the id: ${taskID}"));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllItems,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
