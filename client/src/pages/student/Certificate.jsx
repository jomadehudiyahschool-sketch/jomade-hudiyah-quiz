import { useEffect, useState, useRef } from "react";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Certificate() {

    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const certificateRef = useRef(null);

    useEffect(() => {

        loadCertificate();

    }, []);

    const loadCertificate = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/api/certificates/${id}`

            );

            setStudent(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };
    const downloadPDF = async () => {

    const canvas = await html2canvas(

        certificateRef.current,

        {

            scale:2

        }

    );

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF(

        "landscape",

        "mm",

        "a4"

    );

    const width = pdf.internal.pageSize.getWidth();

    const height =

        canvas.height *

        width /

        canvas.width;

    pdf.addImage(

        imgData,

        "PNG",

        0,

        0,

        width,

        height

    );

    pdf.save(

        `${student.name}-Certificate.pdf`

    );

};
    if (!student)

        return (

            <div className="min-h-screen flex items-center justify-center text-3xl">

                Loading Certificate...

            </div>

        );

    return (

        <div className="bg-gray-300 min-h-screen p-10">

            <div
    ref={certificateRef}
    id="certificate"
                className="bg-white w-[1100px] mx-auto p-16 border-[14px] border-yellow-500 rounded-xl shadow-2xl"
            >

                <div className="text-center">

                    <h1 className="text-6xl font-black text-blue-900">

                        🏫 JOMADE HUDIYAH SCHOOL

                    </h1>

                    <p className="text-2xl mt-3">

                        Quiz Competition Certificate

                    </p>

                    <hr className="my-8 border-2 border-yellow-500"/>

                </div>

                <div className="text-center mt-12">

                    <p className="text-3xl">

                        This Certificate is Presented To

                    </p>

                    <h1 className="text-7xl font-black text-green-700 mt-8">

                        {student.name}

                    </h1>

                    <p className="text-3xl mt-8">

                        For Outstanding Participation in the

                    </p>

                    <h2 className="text-5xl font-bold mt-5">

                        Jomade Hudiyah School Quiz Competition
                    </h2>

                </div>

                <div className="grid grid-cols-3 gap-10 mt-20 text-center">

                    <div>

                        <h3 className="text-xl">

                            Position

                        </h3>

                        <p className="text-5xl font-black mt-3">

                            {student.position}

                        </p>

                    </div>

                    <div>

                        <h3 className="text-xl">

                            Score

                        </h3>

                        <p className="text-5xl font-black mt-3">

                            {student.score}

                        </p>

                    </div>

                    <div>

                        <h3 className="text-xl">

                            Certificate No.

                        </h3>

                        <p className="text-xl font-bold mt-3">

                            {student.certificateNumber}

                        </p>

                    </div>

                </div>

                <div className="flex justify-between mt-24">

                    <div className="text-center">

                        ______________________

                        <p className="mt-3">

                            Principal

                        </p>

                    </div>

                    <div className="text-center">

                        ______________________

                        <p className="mt-3">

                            Quiz Coordinator

                        </p>

                    </div>

                </div>

                <div className="mt-20 text-center">

                    <h2 className="text-xl">

                        Powered by

                    </h2>

                    <h1 className="text-4xl font-black text-cyan-700 mt-3">

                        OYAJARE PRO TECHNOLOGY

                    </h1>

                    <p className="text-2xl mt-3">

                        CEO: Oyewole Abdullah

                    </p>

                </div>

            </div>

            <div className="flex justify-center gap-6 mt-10">

    <button

        onClick={downloadPDF}

        className="bg-green-600 hover:bg-green-700 px-8 py-5 rounded-xl text-xl text-white"

    >

        📥 Download PDF

    </button>

    <button

        onClick={()=>window.print()}

        className="bg-blue-700 hover:bg-blue-800 px-8 py-5 rounded-xl text-xl text-white"

    >

        🖨 Print

    </button>

</div>

        </div>

    );

}