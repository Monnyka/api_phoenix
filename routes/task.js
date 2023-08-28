const express = require("express");
const router = express.Router();

const { getAllItems, createTask,getTask, deleteTask, updateTask } = require("../controllers/task");

router.route('/').get(getAllItems).post(createTask)
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)

module.exports = router;
