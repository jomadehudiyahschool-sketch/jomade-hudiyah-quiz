const Question = require("../models/Question");
const Participant = require("../models/Participant");
class QuizEngine {

    constructor() {

        this.started = false;

        this.paused = false;

        this.finished = false;

        this.questions = [];

        this.currentQuestionIndex = -1;

        this.currentQuestion = null;

        this.timer = 5;

        this.remaining = 5;

        this.interval = null;

    }

    // ==========================
    // LOAD QUESTIONS
    // ==========================

    async loadQuestions() {

        this.questions = await Question.find({
            active: true
        });

    }

    // ==========================
    // START QUIZ
    // ==========================

    async start(timer = null) {

    const Competition = require("../models/Competition");

    const settings = await Competition.findOne();

    await this.loadQuestions();

    this.started = true;
    this.finished = false;
    this.paused = false;

    this.timer = timer ?? settings?.timer ?? 5;

   this.currentQuestionIndex = -1;

this.currentQuestion = null;

    this.remaining = this.timer;

}

    // ==========================
    // NEXT QUESTION
    // ==========================

    

async nextQuestion() {

    await Participant.updateMany(
        {},
        {
            answered: false
        }
    );

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {

        this.finished = true;

        this.started = false;

        this.currentQuestion = null;

        return null;

    }

    this.currentQuestion = this.questions[this.currentQuestionIndex];

        console.log("Questions:", this.questions.length);
console.log("Current Index:", this.currentQuestionIndex);
console.log("Question:", this.currentQuestion);
    this.remaining = this.timer;

    return this.currentQuestion;

}

    // ==========================
    // PAUSE
    // ==========================

    pause() {

        this.paused = true;

    }

    // ==========================
    // RESUME
    // ==========================

    resume() {

        this.paused = false;

    }

    // ==========================
    // STOP
    // ==========================

    stop() {

        this.started = false;

        this.finished = true;

        this.currentQuestion = null;

        this.currentQuestionIndex = -1;

        clearInterval(this.interval);

    }

    // ==========================
    // STATUS
    // ==========================

    status() {

        return {

            started: this.started,

            paused: this.paused,

            finished: this.finished,

            timer: this.timer,

            remaining: this.remaining,

            currentQuestionIndex: this.currentQuestionIndex,

            totalQuestions: this.questions.length,

            question: this.currentQuestion

        };

    }

}

module.exports = new QuizEngine();