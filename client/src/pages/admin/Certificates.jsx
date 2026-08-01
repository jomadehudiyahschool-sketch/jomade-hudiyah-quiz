import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function Certificates() {

    const [certificates, setCertificates] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadCertificates();

    }, []);

    const loadCertificates = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/certificates"

            );

            setCertificates(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const filtered = certificates.filter(student =>

        student.name.toLowerCase().includes(

            search.toLowerCase()

        )

    );

    return (

        <AdminLayout>

            <div className="min-h-screen text-white">

                <h1 className="text-5xl font-black">

                    📜 Certificates

                </h1>

                <p className="text-gray-400 mt-3">

                    View, Print and Download Certificates

                </p>

                <input

                    type="text"

                    placeholder="Search Student..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    className="mt-8 w-full bg-slate-800 p-4 rounded-xl outline-none"

                />

                <div className="mt-8 bg-slate-800 rounded-xl overflow-hidden">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-slate-900">

                                <th className="p-5">#</th>

                                <th>Name</th>

                                <th>School</th>

                                <th>Score</th>

                                <th>Position</th>

                                <th>Certificate No.</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filtered.map((student,index)=>(

                                    <tr

                                        key={student.id}

                                        className="border-t border-slate-700"

                                    >

                                        <td className="text-center p-4">

                                            {index+1}

                                        </td>

                                        <td>

                                            {student.name}

                                        </td>

                                        <td>

                                            {student.school}

                                        </td>

                                        <td className="text-center">

                                            {student.score}

                                        </td>

                                        <td className="text-center">

                                            {student.position}

                                        </td>

                                        <td className="text-center">

                                            {student.certificateNumber}

                                        </td>

                                        <td className="text-center">

                                            <div className="flex justify-center gap-3">

                                                <button

                                                    onClick={()=>

                                                        window.open(

                                                            `/certificate/${student.id}`,

                                                            "_blank"

                                                        )

                                                    }

                                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"

                                                >

                                                    👁 View

                                                </button>

                                                <button

                                                    onClick={()=>

                                                        window.open(

                                                            `/certificate/${student.id}`,

                                                            "_blank"

                                                        )

                                                    }

                                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"

                                                >

                                                    🖨 Print

                                                </button>

                                            </div>

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