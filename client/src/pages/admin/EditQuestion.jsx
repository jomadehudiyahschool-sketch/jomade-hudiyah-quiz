import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function EditQuestion() {

    const { id } = useParams();

    const [form, setForm] = useState({

        question: "",

        options: ["", "", "", ""],

        answer: 0,

        subject: "General Knowledge",

        difficulty: "Easy",

        active: true

    });

    useEffect(() => {

        loadQuestion();

    }, []);

    const loadQuestion = async () => {

        const res = await axios.get(

            `http://localhost:5000/api/questions/${id}`

        );

        setForm(res.data.question);

    };

    const updateOption = (index, value) => {

        const options = [...form.options];

        options[index] = value;

        setForm({

            ...form,

            options

        });

    };

    const save = async () => {

        const password = prompt(

            "Question Manager Password"

        );

        if (!password) return;

        await axios.put(

            `http://localhost:5000/api/questions/${id}`,

            form,

            {

                headers: {

                    "question-password": password

                }

            }

        );

        alert("Question Updated");

        window.location = "/admin/questions";

    };

    return (

        <AdminLayout>

            <h1 className="text-4xl text-white font-bold">

                Edit Question

            </h1>

            <div className="bg-slate-800 rounded-xl p-8 mt-8">

                <textarea

                    rows={4}

                    className="w-full rounded-xl p-4"

                    value={form.question}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            question: e.target.value

                        })

                    }

                />

                {

                    form.options.map((option, index) => (

                        <input

                            key={index}

                            className="w-full mt-4 p-4 rounded-xl"

                            value={option}

                            onChange={(e) =>

                                updateOption(index, e.target.value)

                            }

                        />

                    ))

                }

                <button

                    onClick={save}

                    className="bg-green-600 mt-8 px-10 py-4 rounded-xl"

                >

                    Save Changes

                </button>

            </div>

        </AdminLayout>

    );

}