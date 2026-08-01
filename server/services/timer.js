const quizEngine = require("./quizEngine");

class Timer {

    constructor(){

        this.io = null;

        this.interval = null;

    }

    setIO(io){

        this.io = io;

    }

    start(){

        if(this.interval){

            clearInterval(this.interval);

        }

        quizEngine.remaining = quizEngine.timer;

        const startTime = Date.now();

        this.interval = setInterval(()=>{

            if(!quizEngine.started){

                clearInterval(this.interval);

                return;

            }

            if(quizEngine.paused){

                return;

            }

            const elapsed = (Date.now() - startTime)/1000;

            const remaining = Number(
                (quizEngine.timer - elapsed).toFixed(1)
            );

            quizEngine.remaining = remaining;

            if(this.io){

                this.io.emit("timer-update",{

                    remaining

                });

            }

            if (remaining <= 0) {

    clearInterval(this.interval);

    quizEngine.remaining = 0;

    this.io.emit("time-up");

    this.io.emit("show-answer", {
        answer: quizEngine.currentQuestion.answer
    });

}

        },100);

    }

    stop(){

        clearInterval(this.interval);

    }

}

module.exports=new Timer();