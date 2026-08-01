const express = require("express");

const router = express.Router();

const {

    startQuiz,

    getQuizStatus,

    pauseQuiz,

    resumeQuiz,

    nextQuestion,

    stopQuiz

} = require("../controllers/quizController");

router.get("/status", getQuizStatus);

router.post("/start", startQuiz);

router.post("/pause", pauseQuiz);

router.post("/resume", resumeQuiz);

router.post("/next", nextQuestion);

router.post("/stop", stopQuiz);

module.exports = router;