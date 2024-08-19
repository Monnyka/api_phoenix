const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjectDetails,
  deleteProject,
} = require("../controllers/project");

router.route("/").post(createProject);
router.route("/:id").get(getProjectDetails);
router.route("/:id").delete(deleteProject);

module.exports = router;
