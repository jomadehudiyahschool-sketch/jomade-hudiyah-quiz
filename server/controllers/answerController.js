const Participant = require("../models/Participant");
const Question = require("../models/Question");
const Competition = require("../models/Competition");
const quizEngine = require("../services/quizEngine");
const answerTracker = require("../services/answerTracker");

const {
    calculateScore,
    timeoutScore
} = require("../services/scoreCalculator");

// =========================================
// SUBMIT ANSWER
// =========================================

exports.submitAnswer = async (req, res) => {

    try {

        const {
            participantId,
            answer
        } = req.body;

        const participant = await Participant.findById(participantId);

        if (!participant) {
            return res.status(404).json({
                success: false,
                message: "Participant not found."
            });
        }

        // Prevent multiple answers
        if (participant.answered) {
            return res.status(400).json({
                success: false,
                message: "You have already answered."
            });
        }

        // Get current question
        const question = await Question.findById(
            quizEngine.currentQuestion._id
        );

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found."
            });
        }

        // Check answer
        const correct = Number(answer) === question.answer;

        // Calculate response time
        const timeUsed = Number(
            (quizEngine.timer - quizEngine.remaining).toFixed(1)
        );

        let marks = 0;

        if (correct) {

            marks = await calculateScore(
    quizEngine.timer,
    timeUsed,
    true
);

        } else {

    const settings = await Competition.findOne();

    marks = settings?.wrongMark || 15;

}

        // Update participant
        participant.score += marks;
        participant.answered = true;
        participant.currentQuestion += 1;

        await participant.save();

        // Socket.IO instance
        const io = req.app.get("io");

        // Update live answer counter
        answerTracker.addAnswer();

        io.emit(
            "answers-update",
            answerTracker.status()
        );

        // Update live leaderboard
        const players = await Participant.find().sort({
            score: -1
        });

        io.emit(
            "leaderboard-update",
            players
        );

        // Response
        res.json({
            success: true,
            correct,
            marks,
            total: participant.score
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// =========================================
// TIMEOUT PARTICIPANT
// =========================================

exports.timeoutParticipant = async (participantId) => {

    try {

        const participant = await Participant.findById(participantId);

        if (!participant) return;

        if (participant.answered) return;

        const Competition = require("../models/Competition");

const settings = await Competition.findOne();

participant.score += settings?.unansweredMark || 10;
        participant.answered = true;
        participant.currentQuestion += 1;

        await participant.save();

    } catch (err) {

        console.log(err.message);

    }

};