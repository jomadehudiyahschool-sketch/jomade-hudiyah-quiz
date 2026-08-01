import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

export default function QRCode() {

    const [participants, setParticipants] = useState([]);

    const joinLink = `${window.location.origin}/join`;

    useEffect(() => {

        loadParticipants();

        const timer = setInterval(loadParticipants, 2000);

        return () => clearInterval(timer);

    }, []);

    async function loadParticipants() {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/participants"
            );

            setParticipants(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white relative overflow-hidden">

    {/* Animated Background */}

    <div className="absolute inset-0">

        <div className="absolute w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>

        <div className="absolute w-[500px] h-[500px] bg-green-500 opacity-10 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>

    </div>

    <div className="relative z-10 flex flex-col items-center">

        <div className="mt-12 text-center">

            <h1 className="text-7xl font-black tracking-wider">

                🏫 JOMADE HUDIYAH SCHOOL

            </h1>

            <h2 className="text-4xl mt-5 text-cyan-400 font-bold">

                QUIZ COMPETITION

            </h2>

        </div>

        <div className="mt-16 bg-white p-10 rounded-[40px] shadow-2xl">

            <QRCodeCanvas

                value={joinLink}

                size={360}

                includeMargin

            />

        </div>

        <div className="mt-10 text-center">

            <h2 className="text-4xl font-black text-yellow-400">

                📱 SCAN TO JOIN

            </h2>

            <p className="text-2xl mt-5 text-gray-300">

                Scan using any smartphone camera

            </p>

            <p className="text-xl mt-2">

                Enter your Full Name

            </p>

            <p className="text-xl">

                Join the Competition

            </p>

        </div>

        <div className="mt-14 bg-slate-800/90 backdrop-blur rounded-3xl px-20 py-10 shadow-2xl">

            <h3 className="text-3xl font-bold">

                👨‍🎓 Participants Registered

            </h3>

            <div className="text-8xl font-black text-green-400 text-center mt-6">

                {participants.length}

            </div>

        </div>

        <div className="mt-16 w-full overflow-hidden bg-cyan-600 py-4">

            <div style={{
    animation: "marquee 20s linear infinite"
}}>

                ⭐ Welcome to Jomade Hudiyah School Quiz Competition ⭐
                Please Scan the QR Code ⭐
                Enter Your Full Name ⭐
                Wait for the Competition to Begin ⭐
                Good Luck To All Participants ⭐

            </div>

        </div>

        <div className="mt-16 mb-10 text-center">

            <p className="text-xl">

                Powered by

            </p>

            <h1 className="text-5xl font-black text-cyan-400 mt-4">

                OYAJARE PRO TECHNOLOGY

            </h1>

            <p className="text-2xl mt-5">

                CEO: Oyewole Abdullah

            </p>

        </div>

    </div>

</div>
    );

}