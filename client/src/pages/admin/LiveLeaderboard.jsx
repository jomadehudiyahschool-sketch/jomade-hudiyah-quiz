import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../services/socket";
import AdminLayout from "../../layouts/AdminLayout";

export default function LiveLeaderboard() {

    const [players, setPlayers] = useState([]);

    const loadLeaderboard = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/participants"
            );

            const sorted = [...res.data].sort(
                (a, b) => b.score - a.score
            );

            setPlayers(sorted);

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadLeaderboard();

        socket.on("leaderboard-update", (data) => {

            const sorted = [...data].sort(
                (a, b) => b.score - a.score
            );

            setPlayers(sorted);

        });

        return () => {

            socket.off("leaderboard-update");

        };

    }, []);

    const medal = (index) => {

        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";

        return index + 1;

    };

    return (

        <AdminLayout>

            <div className="min-h-screen bg-slate-950 text-white p-10">

                <h1 className="text-5xl font-black">

                    🏆 LIVE LEADERBOARD

                </h1>

                <p className="text-gray-400 mt-2">

                    Rankings update automatically during the competition

                </p>

                <div className="mt-10 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">

                    <table className="w-full">

                        <thead className="bg-slate-900">

                            <tr>

                                <th className="p-5 text-left">

                                    Rank

                                </th>

                                <th className="text-left">

                                    Participant

                                </th>

                                <th className="text-center">

                                    School

                                </th>

                                <th className="text-center">

                                    Score

                                </th>

                                <th className="text-center">

                                    Status

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                players.map((player, index) => (

                                    <tr
                                        key={player._id}
                                        className={`border-b border-slate-700 transition-all duration-500

                                        ${index===0?"bg-yellow-600/20":""}
                                        ${index===1?"bg-gray-400/20":""}
                                        ${index===2?"bg-orange-500/20":""}

                                        `}
                                    >

                                        <td className="p-5 text-3xl">

                                            {medal(index)}

                                        </td>

                                        <td>

                                            <span className="font-bold text-xl">

                                                {player.name}

                                            </span>

                                        </td>

                                        <td className="text-center">

                                            {player.school || "Jomade Hudiyah"}

                                        </td>

                                        <td className="text-center text-green-400 font-black text-2xl">

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

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}