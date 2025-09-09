const express = require("express");
const multer = require("multer");
const router = express.Router();

const Asset = require("../src/models/Asset");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../src/error/custom-error");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/assets/");
  },
  filename: function (req, file, cb) {
    // You might want to generate a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

// Create a new asset
router.post(
  "/",
  upload.single("image"),
  asyncWrapper(async (req, res) => {
    const asset = await Asset.create({
      ...req.body,
      image: req.file.path, // Save the file path in the database
    });
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
  upload.single("image"),
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const asset = await Asset.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: req.file.path, // Save the file path in the database
      },
      {
        new: true,
        runValidators: true,
      }
    );
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
