const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "test",
    trim: true,
    maxlength: [70, "name can not be more than 20 characters"],
  },
  description: {
    type: String,
    default: "",
    trim: true,
    maxlength: [1000, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
