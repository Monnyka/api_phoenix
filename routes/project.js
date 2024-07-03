const express = require("express");
const router = express.Router();

const { createProject, getProjectDetails } = require("../controllers/project");

router.route("/").post(createProject);
router.route("/:id").get(getProjectDetails);

module.exports = router;
