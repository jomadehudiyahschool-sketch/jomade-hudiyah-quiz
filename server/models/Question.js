const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      validate: {
        validator: (arr) => arr.length === 4,
        message: "Exactly four options are required.",
      },
      required: true,
    },

    answer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    subject: {
      type: String,
      default: "General Knowledge",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    active: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      default: "Administrator",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);