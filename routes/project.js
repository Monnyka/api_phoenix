const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjectDetails,
  getProjectList,
  deleteProject,
} = require("../controllers/project");

router.route("/").post(createProject);
router.route("/").get(getProjectList);
router.route("/:id").get(getProjectDetails);
router.route("/:id").delete(deleteProject);

module.exports = router;
