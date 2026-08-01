const express = require("express");

const router = express.Router();

const {
  joinQuiz,
  getParticipants,
  deleteParticipant,
} = require("../controllers/participantController");

// Join Competition
router.post("/join", joinQuiz);

// Get All Participants
router.get("/", getParticipants);

// Delete Participant
router.delete("/:id", deleteParticipant);

module.exports = router;