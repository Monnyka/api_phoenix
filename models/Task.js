const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [120, "name can not be more than 120 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [250, "description can not be more than 250 characters"],
    default: "Description",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
