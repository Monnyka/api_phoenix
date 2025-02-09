const express = require("express");
const router = express.Router();

const Asset = require("../models/Asset");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

// Create a new asset
router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const asset = await Asset.create(req.body);
    res.status(201).json({ asset });
  })
);

// Get all assets
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    const assets = await Asset.find();
    res.status(200).json({ assets });
  })
);

// Get an asset by ID
router.get(
  "/:id",
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const asset = await Asset.findById(id);
    if (!asset) {
      return next(createCustomError(`No asset found with ID ${id}`, 404));
    }
    res.status(200).json({ asset });
  })
);

// Update an asset by ID
router.patch(
  "/:id",
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const asset = await Asset.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!asset) {
      return next(createCustomError(`No asset found with ID ${id}`, 404));
    }
    res.status(200).json({ asset });
  })
);

// Delete an asset by ID
router.delete(
  "/:id",
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const asset = await Asset.findByIdAndDelete(id);
    if (!asset) {
      return next(createCustomError(`No asset found with ID ${id}`, 404));
    }
    res.status(200).json({ asset });
  })
);

module.exports = router;
