import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function Settings() {

    const [timer, setTimer] = useState(5);
    const [wrongMark, setWrongMark] = useState(15);
    const [unansweredMark, setUnansweredMark] = useState(10);
    const [deductionPerTenth, setDeductionPerTenth] = useState(1);

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const res = await axios.get(
                "https://jomade-hudiyah-backend.onrender.com/api/competition"
            );

            setTimer(res.data.timer);
            setWrongMark(res.data.wrongMark);
            setUnansweredMark(res.data.unansweredMark);
            setDeductionPerTenth(res.data.deductionPerTenth);

        } catch (err) {

            console.log(err);

        }

    };

    const saveSettings = async () => {

        try {

            await axios.put(
                "https://jomade-hudiyah-backend.onrender.com/api/competition",
                {
                    timer,
                    wrongMark,
                    unansweredMark,
                    deductionPerTenth
                }
            );

            alert("Competition settings saved successfully.");

        } catch (err) {

            alert("Unable to save settings.");

        }

    };

    return (

        <AdminLayout>

            <h1 className="text-4xl font-black text-white">

                ⚙ Competition Settings

            </h1>

            <div className="bg-slate-800 rounded-3xl p-10 mt-10 text-white">

                <div className="grid grid-cols-2 gap-8">

                    <div>

                        <label className="font-bold">

                            Question Timer (Seconds)

                        </label>

                        <input

                            type="number"

                            value={timer}

                            onChange={(e)=>setTimer(Number(e.target.value))}

                            className="w-full mt-3 rounded-xl p-4 text-black"

                        />

                    </div>

                    <div>

                        <label className="font-bold">

                            Wrong Answer Penalty

                        </label>

                        <input

                            type="number"

                            value={wrongMark}

                            onChange={(e)=>setWrongMark(Number(e.target.value))}

                            className="w-full mt-3 rounded-xl p-4 text-black"

                        />

                    </div>

                    <div>

                        <label className="font-bold">

                            Unanswered Penalty

                        </label>

                        <input

                            type="number"

                            value={unansweredMark}

                            onChange={(e)=>setUnansweredMark(Number(e.target.value))}

                            className="w-full mt-3 rounded-xl p-4 text-black"

                        />

                    </div>

                    <div>

                        <label className="font-bold">

                            Marks Deducted Every 0.1 Second

                        </label>

                        <input

                            type="number"

                            value={deductionPerTenth}

                            onChange={(e)=>setDeductionPerTenth(Number(e.target.value))}

                            className="w-full mt-3 rounded-xl p-4 text-black"

                        />

                    </div>

                </div>

                <button

                    onClick={saveSettings}

                    className="mt-10 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-bold text-xl"

                >

                    💾 Save Settings

                </button>

            </div>

        </AdminLayout>

    );

}