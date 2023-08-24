const express = require("express");
const router = express.Router();

const { getAllItems, createTask, getTask } = require("../controllers/task");

router.route('/').get(getAllItems).post(createTask)
router.route('/:id').get(getTask)

module.exports = router;