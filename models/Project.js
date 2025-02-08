const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scope: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provice user"],
    },
    member: [
      {
        users: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          required: true,
          enum: ["admin", "developer", "viewer"], // Example roles
          default: "viewer",
        },
      },
    ], // Array of objects containing user ID, name, and role
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
