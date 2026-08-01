import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function AddQuestion() {

    const [saving, setSaving] = useState(false);

    const [password, setPassword] = useState("");

    const [form, setForm] = useState({

        question: "",

        options: ["", "", "", ""],

        answer: 0,

        subject: "General Knowledge",

        difficulty: "Easy",

        active: true

    });

    const updateOption = (index, value) => {

        const options = [...form.options];

        options[index] = value;

        setForm({

            ...form,

            options

        });

    };

    const saveQuestion = async () => {

        if (!form.question.trim()) {

            return alert("Please enter the question.");

        }

        for (let option of form.options) {

            if (!option.trim()) {

                return alert("Please complete all four options.");

            }

        }

        if (!password) {

            return alert("Question Manager Password is required.");

        }

        try {

            setSaving(true);

            await axios.post(

                "http://localhost:5000/api/questions",

                form,

                {

                    headers: {

                        "question-password": password

                    }

                }

            );

            alert("Question Added Successfully!");

            window.location = "/admin/questions";

        }

        catch(err){

            alert(

                err.response?.data?.message ||

                "Unable to save question."

            );

        }

        finally{

            setSaving(false);

        }

    };

    return(

        <AdminLayout>

            <h1 className="text-4xl font-bold text-white">

                ➕ Add New Question

            </h1>

            <div className="bg-slate-800 rounded-2xl p-8 mt-8">

                <label className="text-white font-bold">

                    Question

                </label>

                <textarea

                    rows={4}

                    value={form.question}

                    onChange={(e)=>

                        setForm({

                            ...form,

                            question:e.target.value

                        })

                    }

                    className="w-full mt-3 rounded-xl p-4"

                    placeholder="Enter Question"

                />
                                {/* ================= OPTIONS ================= */}

                <div className="grid grid-cols-2 gap-5 mt-8">

                    {

                        form.options.map((option,index)=>(

                            <div key={index}>

                                <label className="text-white font-semibold">

                                    Option {String.fromCharCode(65+index)}

                                </label>

                                <input

                                    type="text"

                                    value={option}

                                    onChange={(e)=>

                                        updateOption(

                                            index,

                                            e.target.value

                                        )

                                    }

                                    className="w-full mt-2 rounded-xl p-4"

                                    placeholder={`Option ${String.fromCharCode(65+index)}`}

                                />

                            </div>

                        ))

                    }

                </div>


                {/* ================= CORRECT ANSWER ================= */}

                <div className="mt-8">

                    <label className="text-white font-bold">

                        Correct Answer

                    </label>

                    <select

                        value={form.answer}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                answer:Number(e.target.value)

                            })

                        }

                        className="w-full mt-3 rounded-xl p-4"

                    >

                        <option value={0}>Option A</option>

                        <option value={1}>Option B</option>

                        <option value={2}>Option C</option>

                        <option value={3}>Option D</option>

                    </select>

                </div>


                {/* ================= SUBJECT & DIFFICULTY ================= */}

                <div className="grid grid-cols-2 gap-6 mt-8">

                    <div>

                        <label className="text-white font-bold">

                            Subject

                        </label>

                        <input

                            type="text"

                            value={form.subject}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    subject:e.target.value

                                })

                            }

                            className="w-full mt-3 rounded-xl p-4"

                            placeholder="General Knowledge"

                        />

                    </div>

                    <div>

                        <label className="text-white font-bold">

                            Difficulty

                        </label>

                        <select

                            value={form.difficulty}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    difficulty:e.target.value

                                })

                            }

                            className="w-full mt-3 rounded-xl p-4"

                        >

                            <option>Easy</option>

                            <option>Medium</option>

                            <option>Hard</option>

                        </select>

                    </div>

                </div>
                                {/* ================= ACTIVE ================= */}

                <div className="mt-8">

                    <label className="text-white font-bold flex items-center gap-3">

                        <input

                            type="checkbox"

                            checked={form.active}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    active:e.target.checked

                                })

                            }

                            className="w-5 h-5"

                        />

                        Active Question

                    </label>

                </div>


                {/* ================= PASSWORD ================= */}

                <div className="mt-8">

                    <label className="text-white font-bold">

                        Question Manager Password

                    </label>

                    <input

                        type="password"

                        value={password}

                        onChange={(e)=>

                            setPassword(e.target.value)

                        }

                        className="w-full mt-3 rounded-xl p-4"

                        placeholder="Enter Question Manager Password"

                    />

                </div>


                {/* ================= BUTTONS ================= */}

                <div className="flex gap-5 mt-10">

                    <button

                        onClick={saveQuestion}

                        disabled={saving}

                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 px-8 py-4 rounded-xl text-white font-bold"

                    >

                        {

                            saving

                            ?

                            "Saving..."

                            :

                            "💾 Save Question"

                        }

                    </button>

                    <button

                        type="button"

                        onClick={()=>

                            setForm({

                                question:"",

                                options:["","","",""],

                                answer:0,

                                subject:"General Knowledge",

                                difficulty:"Easy",

                                active:true

                            })

                        }

                        className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-white font-bold"

                    >

                        🔄 Reset

                    </button>

                </div>

            </div>

        </AdminLayout>

    );

}