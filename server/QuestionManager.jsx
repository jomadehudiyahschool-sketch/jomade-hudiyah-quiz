import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function QuestionManager() {

    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");

    const loadQuestions = async () => {

        try{

            const res = await axios.get(
                "https://jomade-hudiyah-backend.onrender.com/api/questions"
            );

            setQuestions(res.data.questions);

        }

        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        loadQuestions();

    },[]);

    const filtered = questions.filter(q=>

        q.question.toLowerCase().includes(
            search.toLowerCase()
        )

    );

    return(

        <AdminLayout>

            <div className="flex justify-between items-center">

                <h1 className="text-4xl text-white font-bold">

                    🔒 Question Manager

                </h1>

                <button

                    onClick={()=>window.location="/admin/questions/add"}

                    className="bg-green-600 px-6 py-3 rounded-xl text-white font-bold"

                >

                    + Add Question

                </button>

            </div>

            <div className="mt-8">

                <input

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    placeholder="Search Question..."

                    className="w-full p-4 rounded-xl"

                />

            </div>

            <div className="bg-slate-800 rounded-xl mt-8 overflow-hidden">

                <table className="w-full text-white">

                    <thead className="bg-slate-700">

                        <tr>

                            <th className="p-4">Question</th>

                            <th>Subject</th>

                            <th>Difficulty</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.map(question=>(

                                <tr

                                    key={question._id}

                                    className="border-b border-slate-700"

                                >

                                    <td className="p-4">

                                        {question.question}

                                    </td>

                                    <td>

                                        {question.subject}

                                    </td>

                                    <td>

                                        {question.difficulty}

                                    </td>

                                    <td>

                                        {

                                            question.active

                                            ?

                                            "🟢 Active"

                                            :

                                            "🔴 Disabled"

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="bg-blue-600 px-3 py-2 rounded mr-2"

                                        >

                                            Edit

                                        </button>

                                        <button

                                            className="bg-red-600 px-3 py-2 rounded"

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}