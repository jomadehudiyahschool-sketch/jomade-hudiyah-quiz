import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../services/socket";

export default function Quiz() {

    const participant = JSON.parse(
        localStorage.getItem("participant")
    );

    const [question, setQuestion] = useState(null);

    const [remaining, setRemaining] = useState(0);

    const [selected, setSelected] = useState(null);

    const [answered, setAnswered] = useState(false);

    const [message, setMessage] = useState("");

    // ===========================
    // SOCKET EVENTS
    // ===========================

    useEffect(() => {

        socket.on("quiz-status",(data)=>{

    if(data.question){

        setQuestion(data.question);

        setRemaining(data.remaining);

        setAnswered(false);

        setSelected(null);

        setMessage("");

    }

});
        socket.on("quiz-started", (data) => {

            setQuestion(data.question);

            setRemaining(data.remaining);

            setAnswered(false);

            setSelected(null);

            setMessage("");

        });

        socket.on("next-question", (data) => {

            setQuestion(data.question);

            setRemaining(data.remaining);

            setAnswered(false);

            setSelected(null);

            setMessage("");

        });

        socket.on("timer-update", (data) => {

            setRemaining(data.remaining);

        });

        socket.on("time-up", () => {

            setAnswered(true);

            setMessage("⏰ Time Up");

        });

        socket.on("open-certificate", () => {

    window.location.href =
        `/certificate/${participant._id}`;

});
    socket.on("show-answer",(data)=>{

    setAnswered(true);

    setMessage(
        `✅ Correct Answer: ${
            question.options[data.answer]
        }`
    );

});

socket.on("quiz-ended",()=>{

    window.location.href="/result";

});

        return () => {

            socket.off("quiz-started");

            socket.off("next-question");

            socket.off("timer-update");

            socket.off("time-up");

            socket.off("quiz-ended");
            socket.off("show-answer");
            socket.off("quiz-ended");
            socket.off("quiz-status");

        };

    }, []);

    // ===========================
    // SUBMIT ANSWER
    // ===========================

    const submitAnswer = async (option) => {

        if (answered) return;

        setAnswered(true);

        setSelected(option);

        try {

            const res = await axios.post(

                "https://jomade-hudiyah-backend.onrender.com/api/answers",

                {

                    participantId: participant._id,

                    answer: option

                }

            );

            if (res.data.correct) {

                setMessage(

                    `✅ Correct (+${res.data.marks})`

                );

            }

            else {

                setMessage(

                    `❌ Wrong (+${res.data.marks})`

                );

            }

        }

        catch(err){

            setMessage(

                err.response?.data?.message ||

                "Unable to submit."

            );

        }

    };

    // ===========================
    // WAITING
    // ===========================

    if (!question) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

                <h1 className="text-5xl font-bold">

                    Waiting for Question...

                </h1>

            </div>

        );

    }

    // ===========================
    // UI
    // ===========================

    return (

        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-10">

            <div className="text-6xl font-black text-yellow-400">

                {remaining.toFixed(1)}

            </div>

            <div className="mt-10 bg-slate-800 rounded-2xl p-8 w-full max-w-5xl">

                <h1 className="text-3xl font-bold">

                    {question.question}

                </h1>

                <div className="grid grid-cols-2 gap-5 mt-8">

                    {question.options.map((option, index) => (

                        <button

                            key={index}

                            disabled={answered}

                            onClick={() => submitAnswer(index)}

                            className={`p-5 rounded-xl text-xl font-bold transition

                            ${selected === index

                                ? "bg-blue-600"

                                : "bg-slate-700 hover:bg-slate-600"

                            }

                            ${answered && "opacity-70"}

                            `}

                        >

                            {option}

                        </button>

                    ))}

                </div>

                <div className="mt-8 text-center text-3xl">

                    {message}

                </div>

            </div>

        </div>

    );

}