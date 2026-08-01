import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../../services/socket";
import AdminLayout from "../../layouts/AdminLayout";
import AwardCeremony from "./AwardCeremony";

export default function Dashboard() {

    const navigate = useNavigate();

    // =========================
    // STATES
    // =========================

    const [participants, setParticipants] = useState([]);
    const [quizStatus, setQuizStatus] = useState({});
    const [timer, setTimer] = useState(5);
    const [loading, setLoading] = useState(false);

    const [answerStats, setAnswerStats] = useState({

        answered:0,

        total:0

    });

    const [passwordModal,setPasswordModal]=useState(false);

    const [password,setPassword]=useState("");

    const [toast,setToast]=useState({

        show:false,

        message:"",

        color:"green"

    });
    const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
        id: i,
        size: Math.random() * 12 + 6,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 6
    }))
);

    // =========================
    // LOAD PARTICIPANTS
    // =========================

    const loadParticipants=async()=>{

        try{

            const res=await axios.get(

                "http://localhost:5000/api/participants"

            );

            const sorted=[...res.data].sort(

                (a,b)=>b.score-a.score

            );

            setParticipants(sorted);

        }

        catch(err){

            console.log(err);

        }

    };

    // =========================
    // LOAD QUIZ STATUS
    // =========================

    const loadQuiz=async()=>{

        try{

            const res=await axios.get(

                "http://localhost:5000/api/quiz/status"

            );

            setQuizStatus(res.data);

        }

        catch(err){

            console.log(err);

        }

    };

    // =========================
    // LOAD SETTINGS
    // =========================

    const loadSettings=async()=>{

        try{

            const res=await axios.get(

                "http://localhost:5000/api/competition"

            );

            setTimer(res.data.timer);

        }

        catch(err){

            console.log(err);

        }

    };

    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(()=>{

        loadParticipants();

        loadQuiz();

        loadSettings();

        const interval=setInterval(()=>{

            loadParticipants();

            loadQuiz();

        },3000);

        return()=>clearInterval(interval);

    },[]);

    // =========================
    // SOCKET EVENTS
    // =========================

    useEffect(()=>{

        socket.on("leaderboard-update",(players)=>{

            const sorted=[...players].sort(

                (a,b)=>b.score-a.score

            );

            setParticipants(sorted);

        });

        socket.on("quiz-started",(status)=>{

    console.log(status);

    setQuizStatus({...status});

    loadParticipants();
            showToast(

                "Competition Started",

                "green"

            );

        });

        socket.on("next-question",(status)=>{

    console.log(status);

    setQuizStatus({...status});

});

        socket.on("timer-update",(data)=>{

            setQuizStatus(prev=>({

                ...prev,

                remaining:data.remaining

            }));

        });

        socket.on("answers-update",(data)=>{

            setAnswerStats(data);

        });

        socket.on("quiz-paused",()=>{

            loadQuiz();

        });

        socket.on("quiz-resumed",()=>{

            loadQuiz();

        });

        socket.on("quiz-ended",()=>{

    loadQuiz();

    showToast(

        "Competition Finished",

        "green"

    );

    setTimeout(()=>{

        navigate("/admin/podium");

    },3000);

});

        return()=>{

            socket.off("leaderboard-update");

            socket.off("quiz-started");

            socket.off("next-question");

            socket.off("timer-update");

            socket.off("answers-update");

            socket.off("quiz-paused");

            socket.off("quiz-resumed");

            socket.off("quiz-ended");

        };

    },[]);

    // =========================
    // TOAST
    // =========================

    const showToast=(message,color)=>{

        setToast({

            show:true,

            message,

            color

        });

        setTimeout(()=>{

            setToast({

                show:false,

                message:"",

                color:"green"

            });

        },2500);

    };

    // =========================
    // SAVE SETTINGS
    // =========================

    const saveSettings=async()=>{

        try{

            await axios.put(

                "http://localhost:5000/api/competition",

                {

                    timer

                }

            );

            showToast(

                "Competition Settings Saved",

                "green"

            );

        }

        catch(err){

            showToast(

                "Unable to Save Settings",

                "red"

            );

        }

    };

    // =========================
    // START QUIZ
    // =========================

    const startQuiz=async()=>{

        try{

            setLoading(true);

            await axios.post(

                "http://localhost:5000/api/quiz/start",

                {

                    timer

                }

            );

            showToast(

                "Quiz Started",

                "green"

            );

        }

        catch(err){

            showToast(

                "Unable to Start Quiz",

                "red"

            );

        }

        finally{

            setLoading(false);

        }

    };
        // =========================
    // PAUSE QUIZ
    // =========================

    const pauseQuiz = async () => {

        try {

            await axios.post(

                "http://localhost:5000/api/quiz/pause"

            );

            showToast(

                "Competition Paused",

                "yellow"

            );

        }

        catch (err) {

            showToast(

                "Unable to Pause Competition",

                "red"

            );

        }

    };

    // =========================
    // RESUME QUIZ
    // =========================

    const resumeQuiz = async () => {

        try {

            await axios.post(

                "http://localhost:5000/api/quiz/resume"

            );

            showToast(

                "Competition Resumed",

                "green"

            );

        }

        catch (err) {

            showToast(

                "Unable to Resume",

                "red"

            );

        }

    };

    // =========================
    // NEXT QUESTION
    // =========================

    const nextQuestion = async () => {

        try {

            await axios.post(

                "http://localhost:5000/api/quiz/next"

            );

        }

        catch (err) {

            showToast(

                "Unable to Load Next Question",

                "red"

            );

        }

    };

    // =========================
    // STOP QUIZ
    // =========================

    const stopQuiz = async () => {

        if (

            !window.confirm(

                "Are you sure you want to end this competition?"

            )

        ) return;

        try {

            await axios.post(

                "http://localhost:5000/api/quiz/stop"

            );

            showToast(

                "Competition Ended",

                "red"

            );

        }

        catch (err) {

            showToast(

                "Unable to End Competition",

                "red"

            );

        }

    };

    // =========================
    // REMOVE PARTICIPANT
    // =========================

    const removeParticipant = async (id) => {

        if (

            !window.confirm(

                "Remove this participant?"

            )

        ) return;

        try {

            await axios.delete(

                `http://localhost:5000/api/participants/${id}`

            );

            loadParticipants();

            showToast(

                "Participant Removed",

                "green"

            );

        }

        catch (err) {

            showToast(

                "Unable to Remove Participant",

                "red"

            );

        }

    };

    // =========================
    // QUESTION MANAGER PASSWORD
    // =========================

    const openQuestionManager = () => {

        setPasswordModal(true);

    };

    const verifyPassword = () => {

        if (password === "jomade@2026") {

            setPassword("");

            setPasswordModal(false);

            navigate("/admin/questions");

        }

        else {

            alert("Incorrect Password");

        }

    };

    // =========================
    // ONLINE COUNT
    // =========================

    const onlineParticipants = participants.filter(

        player => player.connected

    ).length;

    const offlineParticipants =

        participants.length - onlineParticipants;

    // =========================
    // ANSWER PERCENTAGE
    // =========================

    const answeredPercentage =

        answerStats.total > 0

        ?

        (

            (answerStats.answered /

            answerStats.total)

            * 100

        ).toFixed(0)

        :

        0;

    // =========================
    // JSX STARTS HERE
    // =========================

    return (

        <AdminLayout>

            <div className="relative min-h-screen bg-slate-900 overflow-hidden">

                {/* Floating Background */}

                <div className="absolute inset-0 overflow-hidden pointer-events-none">

    {particles.map((particle) => (

        <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400 opacity-20 animate-pulse"
            style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
            }}
        />

    ))}

</div>

                {/* Header */}

                <div className="relative z-10">

                    <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-white to-green-400 bg-clip-text text-transparent">

🏫 Jomade Hudiyah School

</h1>

<p className="text-2xl text-gray-300 mt-3">

Quiz Competition Administration Dashboard

</p>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-6 gap-6 mt-10 relative z-10">

    <div className="bg-slate-800 rounded-xl p-6 shadow-xl">

        <p className="text-gray-400">Participants</p>

        <h2 className="text-5xl font-black text-green-400">

            {participants.length}

        </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-xl">

        <p className="text-gray-400">

            Online

        </p>

        <h2 className="text-5xl font-black text-cyan-400">

            {onlineParticipants}

        </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-xl">

        <p className="text-gray-400">

            Current Question

        </p>

        <h2 className="text-5xl font-black text-yellow-400">

            {

                quizStatus?.currentQuestionIndex >= 0

                ?

                quizStatus.currentQuestionIndex + 1

                :

                0

            }

        </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-xl">

        <p className="text-gray-400">

            Timer

        </p>

        <h2 className="text-5xl font-black text-orange-400">

            {

                quizStatus?.remaining

                ?

                quizStatus.remaining.toFixed(1)

                :

                "0.0"

            }

        </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-xl">

        <p className="text-gray-400">

            Answered

        </p>

        <h2 className="text-5xl font-black text-pink-400">

            {answeredPercentage}%

        </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-6 shadow-xl">

        <p className="text-gray-400">

            Status

        </p>

        <h2 className="text-3xl font-bold">

            {

                quizStatus?.started

                ?

                "🟢 LIVE"

                :

                "🔴 STOPPED"

            }

        </h2>

    </div>

</div>
                                {/* Live Competition Control */}

                <div className="bg-slate-800 rounded-xl p-8 mt-10 shadow-2xl relative z-10">

                    <div className="flex justify-between items-center">

                        <h2 className="text-3xl font-bold text-white">

                            🎮 Live Competition Control

                        </h2>

                        <div className="flex gap-3">

                            <span className="bg-green-600 px-4 py-2 rounded-lg">

                                Question {

                                    quizStatus?.currentQuestionIndex >= 0

                                    ?

                                    quizStatus.currentQuestionIndex + 1

                                    :

                                    0

                                }

                            </span>

                            <span className="bg-yellow-500 px-4 py-2 rounded-lg">

                                {quizStatus?.remaining

                                    ?

                                    quizStatus.remaining.toFixed(1)

                                    :

                                    "0.0"} sec

                            </span>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-8">

                        <div>

                            <label className="block mb-3 text-lg">

                                Question Timer

                            </label>

                            <select

                                value={timer}

                                onChange={(e)=>setTimer(Number(e.target.value))}

                                className="w-full bg-slate-700 rounded-lg p-4"

                            >

                                <option value={5}>5 Seconds</option>

                                <option value={10}>10 Seconds</option>

                                <option value={15}>15 Seconds</option>

                                <option value={20}>20 Seconds</option>

                                <option value={30}>30 Seconds</option>

                                <option value={45}>45 Seconds</option>

                                <option value={60}>60 Seconds</option>

                            </select>

                        </div>

                        <div className="flex items-end">

                            <button

                                onClick={saveSettings}

                                className="bg-blue-600 hover:bg-blue-700 w-full p-4 rounded-xl font-bold"

                            >

                                💾 Save Competition Settings

                            </button>

                        </div>

                    </div>
{quizStatus.question && (

<div className="bg-slate-900 rounded-xl p-6 mt-8">
                                    

    <h2 className="text-2xl font-bold text-cyan-400">

        Current Question

    </h2>

    <h1 className="text-3xl mt-5 font-bold">

        {quizStatus.question.question}

    </h1>

    <div className="grid grid-cols-2 gap-4 mt-8">

        {quizStatus.question.options.map((option,index)=>(

            <div
                key={index}
                className="bg-slate-700 rounded-xl p-4"
            >

                {String.fromCharCode(65+index)}. {option}

            </div>

        ))}

    </div>

</div>

)}
                    <div className="grid grid-cols-3 gap-5 mt-10">

                        <button

                            disabled={loading}

                            onClick={startQuiz}

                            className="bg-green-600 hover:bg-green-700 rounded-xl py-5 text-xl font-bold"

                        >

                            ▶ START QUIZ

                        </button>

                        <button

                            onClick={pauseQuiz}

                            className="bg-yellow-500 hover:bg-yellow-600 rounded-xl py-5 text-xl font-bold"

                        >

                            ⏸ PAUSE

                        </button>

                        <button

                            onClick={resumeQuiz}

                            className="bg-cyan-600 hover:bg-cyan-700 rounded-xl py-5 text-xl font-bold"

                        >

                            ▶ RESUME

                        </button>

                        <button

                            onClick={nextQuestion}

                            className="bg-purple-600 hover:bg-purple-700 rounded-xl py-5 text-xl font-bold"

                        >

                            ⏭ NEXT QUESTION

                        </button>

                        <button

                            onClick={stopQuiz}

                            className="bg-red-600 hover:bg-red-700 rounded-xl py-5 text-xl font-bold"

                        >

                            ⏹ END QUIZ

                        </button>

                        <button

                            onClick={openQuestionManager}

                            className="bg-orange-600 hover:bg-orange-700 rounded-xl py-5 text-xl font-bold"

                        >

                            ❓ QUESTION MANAGER

                        </button>

                    </div>

                </div>

                {/* Participants */}

                <div className="bg-slate-800 rounded-xl p-8 mt-10 shadow-xl relative z-10">

                    <div className="flex justify-between items-center">

                        <h2 className="text-3xl font-bold">

                            👨‍🎓 Registered Participants

                        </h2>

                        <span className="text-gray-400">

                            {participants.length} Participants

                        </span>

                    </div>

                    <div className="overflow-auto mt-8">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-slate-700">

                                    <th className="text-left p-4">#</th>

                                    <th className="text-left p-4">Student</th>

                                    <th className="text-center">School</th>

                                    <th className="text-center">Score</th>

                                    <th className="text-center">Status</th>

                                    <th className="text-center">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    participants.map((player,index)=>(

                                        <tr

                                            key={player._id}

                                            className="border-b border-slate-700 hover:bg-slate-700"

                                        >

                                            <td className="p-4">

                                                {index+1}

                                            </td>

                                            <td>

                                                {player.name}

                                            </td>

                                            <td className="text-center">

                                                {

                                                    player.school ||

                                                    "Jomade Hudiyah"

                                                }

                                            </td>

                                            <td className="text-center font-bold text-green-400">

                                                {player.score}

                                            </td>

                                            <td className="text-center">

                                                {

                                                    player.connected

                                                    ?

                                                    <span className="text-green-400">

                                                        🟢 Online

                                                    </span>

                                                    :

                                                    <span className="text-red-400">

                                                        🔴 Offline

                                                    </span>

                                                }

                                            </td>

                                            <td className="text-center">

                                                <button

                                                    onClick={()=>removeParticipant(player._id)}

                                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"

                                                >

                                                    Remove

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>
                                {/* Password Modal */}

                {

                    passwordModal && (

                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                            <div className="bg-slate-800 rounded-xl p-10 w-[500px] shadow-2xl">

                                <h2 className="text-3xl font-bold text-center">

                                    🔐 Question Manager

                                </h2>

                                <p className="text-gray-400 mt-4 text-center">

                                    Enter Administrator Password

                                </p>

                                <input

                                    type="password"

                                    value={password}

                                    onChange={(e)=>setPassword(e.target.value)}

                                    placeholder="Password"

                                    className="w-full mt-8 bg-slate-700 rounded-lg p-4 outline-none"

                                />

                                <div className="flex gap-5 mt-8">

                                    <button

                                        onClick={verifyPassword}

                                        className="flex-1 bg-green-600 hover:bg-green-700 p-4 rounded-lg font-bold"

                                    >

                                        Unlock

                                    </button>

                                    <button

                                        onClick={()=>{

                                            setPassword("");

                                            setPasswordModal(false);

                                        }}

                                        className="flex-1 bg-red-600 hover:bg-red-700 p-4 rounded-lg font-bold"

                                    >

                                        Cancel

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                }

                {/* Toast Notification */}

                {

                    toast.show && (

                        <div

                            className={`

                                fixed

                                top-10

                                right-10

                                px-8

                                py-4

                                rounded-xl

                                text-white

                                font-bold

                                shadow-2xl

                                z-50

                                ${

                                    toast.color==="green"

                                    ?

                                    "bg-green-600"

                                    :

                                    toast.color==="yellow"

                                    ?

                                    "bg-yellow-500"

                                    :

                                    "bg-red-600"

                                }

                            `}

                        >

                            {toast.message}

                        </div>

                    )

                }

                {/* Footer */}

                <div className="mt-20 border-t border-cyan-600 pt-12 text-center">

    <h2 className="text-xl text-gray-300">

        Powered by

    </h2>

    <h1 className="text-5xl font-black text-cyan-400 mt-3 tracking-widest">

        OYAJARE PRO TECHNOLOGY

    </h1>

    <p className="text-2xl text-white mt-5">

        CEO: Oyewole Abdullah

    </p>

    <p className="text-lg text-gray-400 mt-2">
    Official Developer of
</p>

    <p className="text-2xl font-bold text-green-400">

        Jomade Hudiyah School Quiz Competition System

    </p>

    <div className="mt-8 text-sm text-gray-500">

        Version 1.0.0 | © 2026 | All Rights Reserved

    </div>
</div>
</div>
                <AwardCeremony />
        </AdminLayout>

    );

}