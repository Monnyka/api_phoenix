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
    const project = await Project.findById(projectId)
      .populate("tasks")
      .populate({
        path: "member.users", // Populates the user field in the member array
        select: "name email", // Optional: only return the user's name and email
      })
      .exec();
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

//Get Project List
const getProjectList = asyncWrapper(async (req, res, next) => {
  try {
    const projects = await Project.find().exec();
    res.status(200).json({ projects });
  } catch (error) {
    return next(createCustomError("Failed to get project list", 500));
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

    res.status(200).json({ msg: "Project has been deleted successfully" });
  } catch (error) {
    return next(createCustomError("Failed to delete project", 500));
  }
});

//Edit Project
const updateProject = asyncWrapper(async (req, res, next) => {
  const { id: projectId } = req.params;

  try {
    const project = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures validation of the update
    });

    if (!project) {
      return next(
        createCustomError(`No project found with ID ${projectId}`, 404)
      );
    }
    res
      .status(200)
      .json({ msg: "Project has been updated successfully", project });
  } catch (error) {
    return next(createCustomError("Failed to edit project", 500));
  }
});

module.exports = {
  createProject,
  getProjectDetails,
  getProjectList,
  deleteProject,
  updateProject,
};
