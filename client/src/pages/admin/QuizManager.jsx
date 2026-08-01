import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizManager() {
    const [questions, setQuestions] = useState([]);

    const [form, setForm] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: 0,
        category: "General",
        difficulty: "Easy"
    });

    const loadQuestions = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/questions"
            );

            setQuestions(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const addQuestion = async () => {
        try {

            await axios.post(
                "http://localhost:5000/api/questions",
                {
                    question: form.question,
                    options: [
                        form.option1,
                        form.option2,
                        form.option3,
                        form.option4
                    ],
                    answer: Number(form.answer),
                    category: form.category,
                    difficulty: form.difficulty
                }
            );

            alert("Question Added.");

            setForm({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: 0,
                category: "General",
                difficulty: "Easy"
            });

            loadQuestions();

        } catch (err) {
            alert(err.response?.data?.message || "Unable to add question.");
        }
    };

    const deleteQuestion = async (id) => {

        if (!window.confirm("Delete this question?")) return;

        await axios.delete(
            `http://localhost:5000/api/questions/${id}`
        );

        loadQuestions();

    };

    return (

        <div className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-5xl font-bold">
                Quiz Question Manager
            </h1>

            <div className="bg-slate-800 p-8 rounded-xl mt-8">

                <textarea
                    placeholder="Question"
                    className="w-full p-4 rounded text-black"
                    rows={3}
                    value={form.question}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            question: e.target.value
                        })
                    }
                />

                <input
                    className="w-full mt-4 p-3 rounded text-black"
                    placeholder="Option A"
                    value={form.option1}
                    onChange={(e)=>
                        setForm({...form,option1:e.target.value})
                    }
                />

                <input
                    className="w-full mt-3 p-3 rounded text-black"
                    placeholder="Option B"
                    value={form.option2}
                    onChange={(e)=>
                        setForm({...form,option2:e.target.value})
                    }
                />

                <input
                    className="w-full mt-3 p-3 rounded text-black"
                    placeholder="Option C"
                    value={form.option3}
                    onChange={(e)=>
                        setForm({...form,option3:e.target.value})
                    }
                />

                <input
                    className="w-full mt-3 p-3 rounded text-black"
                    placeholder="Option D"
                    value={form.option4}
                    onChange={(e)=>
                        setForm({...form,option4:e.target.value})
                    }
                />

                <div className="grid grid-cols-3 gap-4 mt-4">

                    <select
                        className="p-3 rounded text-black"
                        value={form.answer}
                        onChange={(e)=>
                            setForm({...form,answer:e.target.value})
                        }
                    >
                        <option value={0}>Option A</option>
                        <option value={1}>Option B</option>
                        <option value={2}>Option C</option>
                        <option value={3}>Option D</option>
                    </select>

                    <input
                        className="p-3 rounded text-black"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e)=>
                            setForm({...form,category:e.target.value})
                        }
                    />

                    <select
                        className="p-3 rounded text-black"
                        value={form.difficulty}
                        onChange={(e)=>
                            setForm({...form,difficulty:e.target.value})
                        }
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                </div>

                <button
                    onClick={addQuestion}
                    className="bg-green-600 hover:bg-green-700 mt-6 px-8 py-3 rounded-xl font-bold"
                >
                    Add Question
                </button>

            </div>

            <div className="bg-slate-800 mt-10 rounded-xl p-8">

                <h2 className="text-3xl font-bold mb-5">

                    Questions ({questions.length})

                </h2>

                {questions.map((q,index)=>(

                    <div
                        key={q._id}
                        className="bg-slate-700 rounded-xl p-5 mb-5"
                    >

                        <h3 className="font-bold text-xl">

                            {index+1}. {q.question}

                        </h3>

                        <div className="mt-4">

                            {q.options.map((option,i)=>(

                                <div
                                    key={i}
                                    className={`p-2 rounded mt-2 ${
                                        i===q.answer
                                            ? "bg-green-600"
                                            : "bg-slate-600"
                                    }`}
                                >
                                    {option}
                                </div>

                            ))}

                        </div>

                        <div className="mt-5 flex justify-between">

                            <span>

                                {q.category} | {q.difficulty}

                            </span>

                            <button
                                onClick={()=>deleteQuestion(q._id)}
                                className="bg-red-600 px-5 py-2 rounded"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}