const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    socketId: {
      type: String,
      default: "",
    },

    connected: {
      type: Boolean,
      default: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    position: {
      type: Number,
      default: 0,
    },

    currentQuestion: {
      type: Number,
      default: 0,
    },

    answered: {
    type: Boolean,
    default: false,
},

certificate: {
    type: String,
    default: "",
},

certificateId: {
    type: String,
    default: "",
}

},
{
    timestamps: true
}
);

module.exports = mongoose.model("Participant", participantSchema);