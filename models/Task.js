const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, "name can not be more than 50 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [250, "name can not be more than 250 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
