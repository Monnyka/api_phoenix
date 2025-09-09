const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  // Required fields
  name: {
    type: "string",
    max: 150,
  },
  type: {
    type: "string",
    default: null,
    max: 25,
  },
  description: {
    type: "string",
    default: "",
    max: 500,
  },

  // Optional fields (fields can have optional values)
  location: {
    type: "string",
  },
  condition: {
    type: "number",
    default: 10,
    min: 1,
    max: 10,
  },
  acquired_date: {
    type: "date",
  },
  last_inspected_date: {
    type: "date",
  },
  // Add image field
  image: {
    type: String, // or "Buffer" if you want to store the image data directly
    default: null,
  },

  similar_assets: {
    type: "array",
    elements: {
      type: "object",
    },
  },
});

module.exports = mongoose.model("Asset", assetSchema);
