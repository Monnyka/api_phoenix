const Task = require('../models/Task')

const getAllItems = (req, res) => {
  res.send("This is the response from the server");
};

const createTask = async  (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
}

module.exports = {
  getAllItems,
  createTask
};
