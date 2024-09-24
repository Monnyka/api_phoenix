const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjectDetails,
  getProjectList,
  deleteProject,
  updateProject,
} = require("../controllers/project");

router.route("/").post(createProject);
router.route("/").get(getProjectList);
router.route("/:id").get(getProjectDetails);
router.route("/:id").delete(deleteProject);
router.route("/:id").patch(updateProject);

module.exports = router;
