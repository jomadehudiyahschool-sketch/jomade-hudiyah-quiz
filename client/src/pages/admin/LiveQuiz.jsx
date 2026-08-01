import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../services/socket";

export default function LiveQuiz() {

    const [answers, setAnswers] = useState({
    answered: 0,
    total: 0
});

const [showAnswer, setShowAnswer] = useState(false);
    const [status, setStatus] = useState(null);

    const [timer, setTimer] = useState(5);

    const loadStatus = async () => {

        const res = await axios.get(

            "http://localhost:5000/api/quiz/status"

        );

        setStatus(res.data);

    };


    useEffect(() => {

        loadStatus();

        socket.on("quiz-started", setStatus);

        socket.on("next-question", setStatus);

        socket.on("timer-update", (data) => {

            setStatus((prev) => ({

                ...prev,

                remaining: data.remaining

            }));

        });

        socket.on("quiz-paused", () => {

            loadStatus();

        });

        socket.on("quiz-resumed", () => {

            loadStatus();

        });

        socket.on("quiz-ended", () => {

            loadStatus();

        });
        socket.on("answers-update",(data)=>{
    setAnswers(data);
});

socket.on("time-up",()=>{
    setShowAnswer(true);
});

socket.on("next-question",(status)=>{
    setStatus(status);
    setShowAnswer(false);
});

        return () => {

            socket.off("quiz-started");

            socket.off("next-question");

            socket.off("timer-update");

            socket.off("quiz-paused");

            socket.off("quiz-resumed");

            socket.off("quiz-ended");

            socket.off("answers-update");
            
            socket.off("time-up");

        };

    }, []);

    const startQuiz = async () => {

        await axios.post(

            "http://localhost:5000/api/quiz/start",

            {

                timer

            }

        );

    };

    const nextQuestion = async () => {

        await axios.post(

            "http://localhost:5000/api/quiz/next"

        );

    };

    const pauseQuiz = async () => {

        await axios.post(

            "http://localhost:5000/api/quiz/pause"

        );

    };

    const resumeQuiz = async () => {

        await axios.post(

            "http://localhost:5000/api/quiz/resume"

        );

    };

    const stopQuiz = async () => {

        if (!window.confirm("End Competition?"))

            return;

        await axios.post(

            "http://localhost:5000/api/quiz/stop"

        );

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-5xl font-bold">

                Live Competition Console

            </h1>

            <div className="grid grid-cols-4 gap-5 mt-10">

                <div className="bg-slate-800 rounded-xl p-6">

                    <h2>Question</h2>

                    <div className="text-5xl mt-4">

                        {status?.currentQuestionIndex >= 0

                            ? status.currentQuestionIndex + 1

                            : 0}

                    </div>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                    <h2>Remaining</h2>

                    <div className="text-5xl mt-4 text-yellow-400">

                        {status?.remaining?.toFixed(1) || "0.0"}

                    </div>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                    <h2>Total Questions</h2>

                    <div className="text-5xl mt-4">

                        {status?.totalQuestions || 0}

                    </div>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                    <h2>Status</h2>

                    <div className="text-3xl mt-5">

                        {status?.started

                            ? "🟢 LIVE"

                            : "🔴 STOPPED"}

                    </div>

                </div>

            </div>

            <div className="bg-slate-800 rounded-xl mt-10 p-8">

<h2 className="text-2xl font-bold">

Question

</h2>

<p className="text-3xl mt-5">

{status?.question?.question}

</p>

<div className="grid grid-cols-2 gap-5 mt-8">

{

status?.question?.options?.map(

(option,index)=>(

<div

key={index}

className={`

rounded-xl

p-5

text-2xl

${
showAnswer &&

index===status.question.answer

?

"bg-green-600"

:

"bg-slate-700"

}

`}

>

{String.fromCharCode(65+index)}.

{" "}

{option}

</div>

)

)

}

</div>

</div>

<div className="grid grid-cols-2 gap-6 mt-8">

<div className="bg-slate-800 p-8 rounded-xl">

<h2>

Students Answered

</h2>

<div className="text-5xl mt-5">

{answers.answered}

/

{answers.total}

</div>

</div>

<div className="bg-slate-800 p-8 rounded-xl">

<h2>

Correct Answer

</h2>

<div className="text-5xl mt-5">

{

showAnswer

?

String.fromCharCode(

65+

status?.question?.answer

)

:

"..."

}

</div>

</div>

</div>

            <div className="flex gap-5 mt-10 flex-wrap">

                <button

                    onClick={startQuiz}

                    className="bg-green-600 px-8 py-4 rounded-xl"

                >

                    ▶ Start

                </button>

                <button

                    onClick={pauseQuiz}

                    className="bg-yellow-600 px-8 py-4 rounded-xl"

                >

                    ⏸ Pause

                </button>

                <button

                    onClick={resumeQuiz}

                    className="bg-blue-600 px-8 py-4 rounded-xl"

                >

                    ▶ Resume

                </button>

                <button

                    onClick={nextQuestion}

                    className="bg-purple-600 px-8 py-4 rounded-xl"

                >

                    ⏭ Next

                </button>

                <button

                    onClick={stopQuiz}

                    className="bg-red-600 px-8 py-4 rounded-xl"

                >

                    ⏹ End Competition

                </button>

            </div>

        </div>

    );

}