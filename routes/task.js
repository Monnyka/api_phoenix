const express = require("express");
const router = express.Router();

const { getAllItems, createTask } = require("../controllers/task");

router.route("/").get(getAllItems).post(createTask)

module.exports = router;
