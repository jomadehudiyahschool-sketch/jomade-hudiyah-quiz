import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function Questions() {

    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadQuestions();

    }, []);

    const loadQuestions = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/questions"

            );

            setQuestions(res.data.questions);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const deleteQuestion = async (id) => {

        const ok = window.confirm(

            "Delete this question?"

        );

        if (!ok) return;

        const password = prompt(

            "Enter Question Manager Password"

        );

        if (!password) return;

        try {

            await axios.delete(

                `http://localhost:5000/api/questions/${id}`,

                {

                    headers: {

                        "question-password": password

                    }

                }

            );

            alert("Question deleted.");

            loadQuestions();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Delete failed."

            );

        }

    };

    const filtered = questions.filter(q =>

        q.question

            .toLowerCase()

            .includes(

                search.toLowerCase()

            )

    );
        const easy = questions.filter(
        q => q.difficulty === "Easy"
    ).length;

    const medium = questions.filter(
        q => q.difficulty === "Medium"
    ).length;

    const hard = questions.filter(
        q => q.difficulty === "Hard"
    ).length;

    const active = questions.filter(
        q => q.active
    ).length;

    return (

        <AdminLayout>

            {/* ================= HEADER ================= */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        ❓ Question Manager

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Manage quiz questions for the competition.

                    </p>

                </div>

                <Link

                    to="/admin/questions/add"

                    className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl text-white font-bold"

                >

                    ➕ Add Question

                </Link>

            </div>


            {/* ================= STATISTICS ================= */}

            <div className="grid grid-cols-5 gap-5 mt-8">

                <div className="bg-blue-700 rounded-xl p-5">

                    <p className="text-blue-100">

                        Total

                    </p>

                    <h2 className="text-3xl text-white font-bold">

                        {questions.length}

                    </h2>

                </div>

                <div className="bg-green-700 rounded-xl p-5">

                    <p className="text-green-100">

                        Easy

                    </p>

                    <h2 className="text-3xl text-white font-bold">

                        {easy}

                    </h2>

                </div>

                <div className="bg-yellow-600 rounded-xl p-5">

                    <p className="text-yellow-100">

                        Medium

                    </p>

                    <h2 className="text-3xl text-white font-bold">

                        {medium}

                    </h2>

                </div>

                <div className="bg-red-700 rounded-xl p-5">

                    <p className="text-red-100">

                        Hard

                    </p>

                    <h2 className="text-3xl text-white font-bold">

                        {hard}

                    </h2>

                </div>

                <div className="bg-purple-700 rounded-xl p-5">

                    <p className="text-purple-100">

                        Active

                    </p>

                    <h2 className="text-3xl text-white font-bold">

                        {active}

                    </h2>

                </div>

            </div>


            {/* ================= SEARCH ================= */}

            <div className="mt-8">

                <input

                    type="text"

                    placeholder="🔍 Search Question..."

                    value={search}

                    onChange={(e)=>

                        setSearch(e.target.value)

                    }

                    className="w-full rounded-xl bg-slate-800 text-white p-4 border border-slate-700 outline-none"

                />

            </div>
                        {/* ================= LOADING ================= */}

            {

                loading && (

                    <div className="bg-slate-800 rounded-xl mt-8 p-10 text-center text-white text-xl">

                        Loading Questions...

                    </div>

                )

            }


            {/* ================= EMPTY ================= */}

            {

                !loading && filtered.length === 0 && (

                    <div className="bg-slate-800 rounded-xl mt-8 p-12 text-center">

                        <h2 className="text-3xl text-white">

                            📭 No Questions Found

                        </h2>

                        <p className="text-slate-400 mt-3">

                            Add a question or change your search.

                        </p>

                    </div>

                )

            }


            {/* ================= QUESTION LIST ================= */}

            <div className="space-y-8 mt-8">

                {

                    filtered.map((q,index)=>(

                        <div

                            key={q._id}

                            className="bg-slate-800 rounded-2xl p-7 shadow-lg border border-slate-700"

                        >

                            {/* Header */}

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-xl font-bold text-white">

                                        Question {index+1}

                                    </h2>

                                    <p className="text-slate-300 mt-3 text-lg">

                                        {q.question}

                                    </p>

                                </div>

                                <div className="flex gap-2">

                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">

                                        {q.subject}

                                    </span>

                                    <span className={`px-3 py-1 rounded-full text-sm text-white

                                        ${q.difficulty==="Easy"

                                            ?"bg-green-600"

                                            :q.difficulty==="Medium"

                                            ?"bg-yellow-600"

                                            :"bg-red-600"

                                        }

                                    `}>

                                        {q.difficulty}

                                    </span>

                                </div>

                            </div>

                            {/* Options */}

                            <div className="grid md:grid-cols-2 gap-4 mt-6">

                                {

                                    q.options.map((option,i)=>(

                                        <div

                                            key={i}

                                            className={`rounded-xl p-4 border

                                            ${

                                                q.answer===i

                                                ?

                                                "bg-green-700 border-green-500 text-white"

                                                :

                                                "bg-slate-900 border-slate-700 text-slate-200"

                                            }

                                            `}

                                        >

                                            <span className="font-bold mr-2">

                                                {String.fromCharCode(65+i)}.

                                            </span>

                                            {option}

                                        </div>

                                    ))

                                }

                            </div>

                            {/* Footer */}

                            <div className="flex justify-between items-center mt-8">

                                <div>

                                    {

                                        q.active

                                        ?

                                        <span className="text-green-400">

                                            ● Active

                                        </span>

                                        :

                                        <span className="text-red-400">

                                            ● Inactive

                                        </span>

                                    }

                                </div>

                                <div className="flex gap-4">

                                    <Link

                                        to={`/admin/questions/edit/${q._id}`}

                                        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"

                                    >

                                        ✏ Edit

                                    </Link>

                                    <button

                                        onClick={()=>deleteQuestion(q._id)}

                                        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white"

                                    >

                                        🗑 Delete

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>
                    </AdminLayout>

    );

}