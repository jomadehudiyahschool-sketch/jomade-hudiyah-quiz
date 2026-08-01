import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function WinnerPodium() {

    const [winners, setWinners] = useState([]);

    const loadResults = async () => {

        try {

            const res = await axios.get(
                "https://jomade-hudiyah-backend.onrender.com/api/participants"
            );

            const sorted = [...res.data].sort(
                (a, b) => b.score - a.score
            );

            setWinners(sorted.slice(0, 3));

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadResults();
        setTimeout(()=>{

    window.location.href="/admin/finale";

},10000);

    }, []);

    return (

        <AdminLayout>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-black text-white overflow-hidden">

                <div className="text-center pt-12">

                    <h1 className="text-7xl font-black text-yellow-400 animate-pulse">

                        🏆 GRAND WINNERS 🏆

                    </h1>

                    <p className="text-3xl mt-5 text-cyan-300">

                        Jomade Hudiyah School Quiz Competition

                    </p>

                </div>

                <div className="flex justify-center items-end gap-16 mt-24">

                    {/* SECOND */}

                    <div className="text-center">

                        <div className="text-8xl">

                            🥈

                        </div>

                        <div className="bg-gray-300 text-black rounded-xl p-6 w-60">

                            <h2 className="text-3xl font-bold">

                                {winners[1]?.name || "------"}

                            </h2>

                            <p className="text-xl mt-3">

                                {winners[1]?.score || 0} Marks

                            </p>

                        </div>

                        <div className="bg-gray-400 h-48 rounded-t-xl mt-4"></div>

                    </div>

                    {/* FIRST */}

                    <div className="text-center">

                        <div className="text-9xl animate-bounce">

                            🏆

                        </div>

                        <div className="bg-yellow-400 text-black rounded-xl p-8 w-72 shadow-2xl">

                            <h2 className="text-4xl font-black">

                                {winners[0]?.name || "------"}

                            </h2>

                            <p className="text-2xl mt-3">

                                {winners[0]?.score || 0} Marks

                            </p>

                        </div>

                        <div className="bg-yellow-500 h-72 rounded-t-xl mt-4"></div>

                    </div>

                    {/* THIRD */}

                    <div className="text-center">

                        <div className="text-8xl">

                            🥉

                        </div>

                        <div className="bg-orange-400 text-black rounded-xl p-6 w-60">

                            <h2 className="text-3xl font-bold">

                                {winners[2]?.name || "------"}

                            </h2>

                            <p className="text-xl mt-3">

                                {winners[2]?.score || 0} Marks

                            </p>

                        </div>

                        <div className="bg-orange-500 h-36 rounded-t-xl mt-4"></div>

                    </div>

                </div>

                <div className="text-center mt-24">

                    <h2 className="text-2xl">

                        Powered by

                    </h2>

                    <h1 className="text-5xl font-black text-cyan-400 mt-4">

                        OYAJARE PRO TECHNOLOGY

                    </h1>

                    <p className="text-2xl mt-4">

                        CEO: Oyewole Abdullah

                    </p>

                </div>

            </div>

        </AdminLayout>

    );

}