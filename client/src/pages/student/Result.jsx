import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {

    const navigate = useNavigate();

    useEffect(() => {

        const participant = JSON.parse(
            localStorage.getItem("participant")
        );

        if (!participant) {

            navigate("/join");

            return;

        }

        const timer = setTimeout(() => {

            navigate(`/certificate/${participant._id}`);

        },3000);

        return ()=>clearTimeout(timer);

    },[]);

    return (

        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">

            <div className="animate-spin rounded-full h-24 w-24 border-4 border-yellow-500 border-t-transparent"></div>

            <h1 className="text-5xl font-bold mt-10">

                Calculating Results...

            </h1>

            <p className="text-xl mt-4 text-slate-300">

                Preparing your certificate.

            </p>

        </div>

    );

}