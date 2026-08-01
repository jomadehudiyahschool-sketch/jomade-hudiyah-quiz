class AnswerTracker {

    constructor() {

        this.total = 0;
        this.answered = 0;

    }

    setTotal(total) {

        this.total = total;
        this.answered = 0;

    }

    addAnswer() {

        if (this.answered < this.total) {
            this.answered++;
        }

    }

    reset(total) {

        this.total = total;
        this.answered = 0;

    }

    status() {

        return {

            total: this.total,
            answered: this.answered,
            waiting: this.total - this.answered

        };

    }

}

module.exports = new AnswerTracker();