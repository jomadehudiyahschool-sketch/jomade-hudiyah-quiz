const quizEngine = require("../services/quizEngine");
const timer = require("../services/timer");

const Participant = require("../models/Participant");
const Question = require("../models/Question");
const Competition = require("../models/Competition");

const answerTracker = require("../services/answerTracker");

// ======================================
// START QUIZ
// ======================================

exports.startQuiz = async (req, res) => {

    try {

        const settings = await Competition.findOne();

        const seconds = settings?.timer || 5;

        await quizEngine.start(seconds);
        await quizEngine.nextQuestion();
        console.log(quizEngine.status());
        const connectedPlayers = await Participant.countDocuments({
            connected: true
        });

        answerTracker.setTotal(connectedPlayers);

        if (settings) {

            settings.started = true;
            settings.currentQuestion = 1;

            await settings.save();

        }

        timer.start();

        const io = req.app.get("io");
        console.log(quizEngine.status());

        io.emit("quiz-started", quizEngine.status());

        res.json({

            success: true,

            message: "Quiz Started Successfully",

            quiz: quizEngine.status()

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ======================================
// QUIZ STATUS
// ======================================

exports.getQuizStatus = (req, res) => {

    res.json(

        quizEngine.status()

    );

};

// ======================================
// PAUSE
// ======================================

exports.pauseQuiz = (req, res) => {

    quizEngine.pause();

    req.app.get("io").emit("quiz-paused");

    res.json({

        success: true

    });

};

// ======================================
// RESUME
// ======================================

exports.resumeQuiz = (req, res) => {

    quizEngine.resume();

    req.app.get("io").emit("quiz-resumed");

    res.json({

        success: true

    });

};

// ======================================
// NEXT QUESTION
// ======================================

exports.nextQuestion = async (req, res) => {

    try {

        const question = await quizEngine.nextQuestion();

        const settings = await Competition.findOne();

        if (!question) {

            timer.stop();

            if (settings) {

                settings.started = false;

                settings.currentQuestion = 0;

                await settings.save();

            }

            const io = req.app.get("io");

// Open certificate immediately for every student
io.emit("open-certificate");

// Start admin ceremony
setTimeout(() => {

    io.emit("show-leaderboard");

}, 1000);

setTimeout(() => {

    io.emit("show-podium");

}, 15000);

setTimeout(() => {

    io.emit("show-finale");

}, 25000);

res.json({
    success: true
});

        }

        if (settings) {

            settings.currentQuestion =
                quizEngine.currentQuestionIndex + 1;

            await settings.save();

        }

        const connectedPlayers = await Participant.countDocuments({

            connected: true

        });

        answerTracker.reset(

            connectedPlayers

        );

        req.app.get("io").emit(

            "answers-update",

            answerTracker.status()

        );

        timer.start();

        req.app.get("io").emit(

            "next-question",

            quizEngine.status()

        );

        res.json({

            success: true,

            question: quizEngine.currentQuestion,

            current:

                quizEngine.currentQuestionIndex + 1,

            total:

                quizEngine.questions.length

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ======================================
// STOP QUIZ
// ======================================

exports.stopQuiz = async (req, res) => {

    try {

        const Competition = require("../models/Competition");
        const Question = require("../models/Question");

        timer.stop();
        quizEngine.stop();

        const settings = await Competition.findOne();

        if (settings) {
            settings.started = false;
            settings.currentQuestion = 0;
            await settings.save();
        }

        // --------------------------------
        // Rank Participants
        // --------------------------------

const totalQuestions = await Question.countDocuments({
    active: true
});

const maxScorePerQuestion = 100;

const maxPossibleScore =
    totalQuestions * maxScorePerQuestion;

const participants = await Participant.find().sort({
    score: -1,
    createdAt: 1
});

participants.forEach((participant, index) => {

    participant.position = index + 1;

    participant.percentage = Math.min(
        100,
        Math.round(
            (participant.score / maxPossibleScore) * 100
        )
    );

});

await Promise.all(
    participants.map(p => p.save())
);

        const io = req.app.get("io");

        // =====================================
        // 1. END QUIZ
        // =====================================

        io.emit("quiz-ended");

        // =====================================
        // 2. SHOW LEADERBOARD
        // =====================================

        setTimeout(() => {

            io.emit("show-leaderboard");

        },1000);

        // =====================================
        // 3. SHOW PODIUM
        // =====================================

        setTimeout(() => {

            io.emit("show-podium");

        },15000);

        // =====================================
        // 4. SHOW FINALE
        // =====================================

        setTimeout(()=>{

    io.emit("show-finale");

    setTimeout(()=>{

        reverse.forEach((participant,index)=>{

            setTimeout(()=>{

                io.emit("finale-player",{

                    participant,

                    position:participant.position,

                    score:participant.score,

                    percentage:participant.percentage

                });

            },index*8000);

        });

    },1500); // wait for React to finish navigation

},25000);

        // =====================================
        // 5. PLAY EVERY PARTICIPANT
        // =====================================

        const reverse = [...participants].reverse();

        reverse.forEach((participant, index) => {

    setTimeout(() => {

        io.emit("finale-player", {

            participant,

            position: participant.position,

            score: participant.score,

            percentage: participant.percentage

        });

    }, index * 8000);

});
setTimeout(() => {

    io.emit("champion-fireworks");

}, reverse.length * 8000);
        // =====================================
        // 6. FIREWORKS
        // =====================================

        setTimeout(()=>{

            io.emit("champion-fireworks");

        },30000 + reverse.length*9000);

        res.json({

            success:true

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};