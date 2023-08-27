const express = require("express");
const router = express.Router();

const { getAllItems, createTask,getTask, deleteTask } = require("../controllers/task");

router.route('/').get(getAllItems).post(createTask)
router.route('/:id').get(getTask).delete(deleteTask)

module.exports = router;
