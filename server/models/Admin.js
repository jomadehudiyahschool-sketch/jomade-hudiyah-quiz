const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    schoolName: {
      type: String,
      default: "Jomade Hudiyah School Quiz Competition",
    },

    schoolLogo: {
      type: String,
      default: "",
    },

    primaryColor: {
      type: String,
      default: "#0f766e",
    },

    darkMode: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: String,
      default: "Oyajare Pro Technology (CEO OYEWOLE ABDULLAH)",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);