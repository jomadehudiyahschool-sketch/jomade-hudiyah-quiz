import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center">

            <div className="text-center">

                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .7 }}
                    className="text-6xl font-extrabold text-white"
                >
                    🏫
                    <br />
                    Jomade Hudiyah School
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .4 }}
                    className="text-4xl mt-5 text-cyan-400"
                >
                    Quiz Competition System
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .8 }}
                    className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto"
                >
                    A beautiful real-time quiz platform with live scoring,
                    projector dashboard, certificates, QR code joining,
                    leaderboard, and exciting winner celebrations.
                </motion.p>

                <div className="grid grid-cols-3 gap-6 mt-12">

                    <div className="bg-white/10 rounded-2xl p-6">
                        <h2 className="text-4xl font-bold text-cyan-400">
                            <CountUp end={100} duration={4} />+
                        </h2>
                        <p className="text-white mt-2">
                            Participants
                        </p>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6">
                        <h2 className="text-4xl font-bold text-yellow-400">
                            <CountUp end={50} duration={4} />
                        </h2>
                        <p className="text-white mt-2">
                            Questions
                        </p>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6">
                        <h2 className="text-4xl font-bold text-green-400">
                            0.1s
                        </h2>
                        <p className="text-white mt-2">
                            Precision Timer
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}