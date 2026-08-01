import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import socket from "../../services/socket";

export default function Results() {

    const [answers, setAnswers] = useState({
    answered:0,
    total:0
});

const [showAnswer,setShowAnswer]=useState(false);

    const [participants, setParticipants] = useState([]);

    useEffect(() => {

        loadResults();

            socket.on("answers-update",(data)=>{

    setAnswers(data);

});
socket.on("time-up",()=>{

    setShowAnswer(true);

});

socket.off("answers-update");

socket.off("time-up");
    }, []);

    const loadResults = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/participants"
            );

            const sorted = [...res.data].sort(
                (a, b) => b.score - a.score
            );

            setParticipants(sorted);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <AdminLayout>

            <h1 className="text-5xl text-white font-black">

                🏆 Competition Results

            </h1>

            <p className="text-gray-400 mt-3">

                Final Leaderboard & Certificate Centre

            </p>

            <div className="flex gap-5 mt-8">

                <button

    onClick={()=>

        window.open(

            "http://localhost:5000/api/certificates/download/all",

            "_blank"

        )

    }

    className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-xl font-bold"

>

    📥 Download All Certificates

</button>

                <button
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl font-bold"
                >
                    🖨 Print All Certificates
                </button>

            </div>

            <div className="bg-slate-800 rounded-xl mt-10 overflow-hidden">

                <table className="w-full text-white">

                    <thead className="bg-slate-700">

                        <tr>

                            <th className="p-4">Position</th>
                            <th>Name</th>
                            <th>School</th>
                            <th>Score</th>
                            <th>Certificate</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            participants.map((student, index) => (

                                <tr
                                    key={student._id}
                                    className="border-b border-slate-700"
                                >

                                    <td className="text-center p-4">

                                        {index + 1}

                                    </td>

                                    <td>

                                        {student.name}

                                    </td>

                                    <td className="text-center">

                                        {student.school || "Jomade Hudiyah"}

                                    </td>

                                    <td className="text-center text-green-400 font-bold">

                                        {student.score}

                                    </td>

                                    <td className="text-center">

                                        <button
                                            onClick={() =>
                                                window.open(
    `http://localhost:5000/api/certificates/${student._id}`,
    "_blank"
)
                                            }
                                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                                        >

                                            🎓 View

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