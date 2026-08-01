const express = require("express");

const router = express.Router();

const {
  getQuestions,
  getQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const questionPassword = require("../middleware/questionPassword");

// Public
router.get("/", getQuestions);
router.get("/:id", getQuestion);

// Protected
router.post("/", questionPassword, addQuestion);
router.put("/:id", questionPassword, updateQuestion);
router.delete("/:id", questionPassword, deleteQuestion);

module.exports = router;