const express = require("express");
const router = express.Router();

// Import the asset controller (which already defines your CRUD endpoints)
const assetController = require("../controllers/asset");

// Mount the asset controller router on this route
router.use("/", assetController);

module.exports = router;
