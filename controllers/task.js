const Task = require('../models/Task')

const getAllItems = async (req, res) => {
try {
  const tasks = await Task.find({})
  res.status(200).json({tasks})
} catch (error) {
  res.status(500).json({msg: error})
}

  
};

const createTask = async(req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({msg: error})
  }

  
}

module.exports = {
  getAllItems,
  createTask
};
