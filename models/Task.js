const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
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
    dueDate: {
      type: Date,
      required: false,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provice user"],
    },
    personInCharge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
