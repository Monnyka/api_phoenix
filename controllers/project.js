const Project = require("../models/Project");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

// Create a new project
const createProject = asyncWrapper(async (req, res, next) => {
  req.body.createdBy = req.user.userId; // Assuming user is authenticated and userId is available

  // Check for required fields
  const { name, description } = req.body;
  if (!name || !description) {
    return next(
      createCustomError("Name and description are required fields", 400)
    );
  }

  try {
    const project = await Project.create(req.body);
    res.status(201).json({ project });
  } catch (error) {
    return next(createCustomError("Failed to create project", 500));
  }
});

// Get project details
const getProjectDetails = asyncWrapper(async (req, res, next) => {
  const { id: projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate("tasks").exec();
    if (!project) {
      return next(
        createCustomError(`No project found with ID ${projectId}`, 404)
      );
    }
    res.status(200).json({ project });
  } catch (error) {
    return next(createCustomError(`Failed to get project details`, 500));
  }
});

// Delete Project
const deleteProject = asyncWrapper(async (req, res, next) => {
  const { id: projectId } = req.params;

  try {
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return next(
        createCustomError(`No project found with ID ${projectId}`, 404)
      );
    }

    res.status(200).json({ msg: "Project deleted successfully" });
  } catch (error) {
    return next(createCustomError("Failed to delete project", 500));
  }
});

module.exports = {
  createProject,
  getProjectDetails,
  deleteProject,
};
