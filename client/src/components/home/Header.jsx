import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-900/60 border-b border-cyan-500/20"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <div>
                    <h1 className="text-2xl font-bold text-cyan-400">
                        🏆 JHSQC
                    </h1>

                    <p className="text-xs text-gray-300">
                        Jomade Hudiyah School Quiz Competition
                    </p>
                </div>

                <div className="flex gap-4">

                    <Link
                        to="/join"
                        className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
                    >
                        Join Competition
                    </Link>

                    <Link
                        to="/admin"
                        className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition"
                    >
                        Admin Login
                    </Link>

                </div>

            </div>
        </motion.header>
    );
}