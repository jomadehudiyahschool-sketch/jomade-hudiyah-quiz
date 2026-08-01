import { useEffect, useState } from "react";
import socket from "../../services/socket";

export default function GrandFinale() {

    const [player, setPlayer] = useState(null);

    useEffect(() => {

        socket.on("finale-player", (data) => {
    setPlayer(data);
});

        return () => {

            socket.off("finale-player");

        };

    }, []);

    if (!player) {

        return (

            <div className="min-h-screen bg-black flex justify-center items-center">

                <h1 className="text-white text-6xl font-black animate-pulse">

                    Preparing Grand Finale...

                </h1>

            </div>

        );

    }

    const medal =

        player.position === 1
            ? "🥇"

        : player.position === 2
            ? "🥈"

        : player.position === 3
            ? "🥉"

        : "🎖️";

    return (

        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black flex justify-center items-center">

            <div className="bg-white rounded-3xl shadow-2xl w-[900px] p-12 text-center animate-pulse">

                <img

                    src="/logo.png"

                    className="w-28 h-28 mx-auto"

                    alt="logo"

                />

                <h2 className="text-green-700 font-black text-4xl mt-5">

                    JOMADE HUDIYAH SCHOOL

                </h2>

                <p className="text-xl mt-2">

                    Annual Quiz Competition

                </p>

                <div className="text-8xl mt-10">

                    {medal}

                </div>

                <h1 className="text-6xl font-black mt-8 text-blue-700">

                    {player.participant.name}

                </h1>

                <div className="grid grid-cols-3 gap-6 mt-10">

                    <div className="bg-green-600 text-white rounded-xl p-6">

                        <h3>Position</h3>

                        <h1 className="text-5xl">

                            {player.position}

                        </h1>

                    </div>

                    <div className="bg-blue-600 text-white rounded-xl p-6">

                        <h3>Score</h3>

                        <h1 className="text-5xl">

                            {player.score}

                        </h1>

                    </div>

                    <div className="bg-yellow-500 text-white rounded-xl p-6">

                        <h3>Percentage</h3>

                        <h1 className="text-5xl">

                            {player.percentage}%

                        </h1>

                    </div>

                </div>

                <div className="mt-10 text-2xl text-gray-700">

                    Congratulations on your performance!

                </div>

            </div>

        </div>

    );

}