import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function Participants() {

    const [participants, setParticipants] = useState([]);

    const loadParticipants = async () => {

        const res = await axios.get(
            "https://jomade-hudiyah-backend.onrender.com/api/participants"
        );

        setParticipants(res.data);

    };

    useEffect(() => {

        loadParticipants();

    }, []);

    const removeParticipant = async(id)=>{

        if(!window.confirm("Remove participant?"))
            return;

        await axios.delete(
            `https://jomade-hudiyah-backend.onrender.com/api/participants/${id}`
        );

        loadParticipants();

    };

    return (

        <AdminLayout>

            <h1 className="text-4xl font-bold text-white">

                👨‍🎓 Participants

            </h1>

            <div className="bg-slate-800 rounded-xl mt-8 p-6">

                <table className="w-full text-white">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Score</th>

                            <th>Status</th>

                            <th></th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            participants.map(player=>(

                                <tr
                                    key={player._id}
                                    className="border-t border-slate-700"
                                >

                                    <td className="p-4">

                                        {player.name}

                                    </td>

                                    <td>

                                        {player.score}

                                    </td>

                                    <td>

                                        {

                                            player.connected

                                            ?

                                            "🟢 Online"

                                            :

                                            "🔴 Offline"

                                        }

                                    </td>

                                    <td>

                                        <button

                                            onClick={()=>removeParticipant(player._id)}

                                            className="bg-red-600 px-4 py-2 rounded"

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

        </AdminLayout>

    );

}