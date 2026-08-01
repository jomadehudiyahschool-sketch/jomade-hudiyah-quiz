const Quiz = require("../models/Quiz");
const Participant = require("../models/Participant");

const PDFDocument = require("pdfkit");
const archiver = require("archiver");

const path = require("path");

const LOGO = path.join(__dirname, "../public/logo.png");

// ==========================================================
// DRAW PREMIUM CERTIFICATE
// ==========================================================

function drawCertificate(doc, participant) {

    // --------------------------------------------------
    // PAGE
    // --------------------------------------------------

    doc.rect(0, 0, 842, 595).fill("#ffffff");

    // --------------------------------------------------
    // RAINBOW BACKGROUND
    // --------------------------------------------------

    const rainbow = [
        "#ff3b30",
        "#ff9500",
        "#ffd60a",
        "#34c759",
        "#0a84ff",
        "#5e5ce6"
    ];

    rainbow.forEach((color, i) => {

        doc.save();

        doc.opacity(0.10);

        doc.circle(
            40 + (i * 130),
            35,
            120
        ).fill(color);

        doc.circle(
            802 - (i * 130),
            560,
            120
        ).fill(color);

        doc.restore();

    });

    // --------------------------------------------------
    // WATERMARK
    // --------------------------------------------------

    try {

        doc.save();

        doc.opacity(0.05);

        doc.image(
            LOGO,
            220,
            120,
            {
                width: 400
            }
        );

        doc.restore();

    } catch (err) {}

    // --------------------------------------------------
    // OUTER GOLD BORDER
    // --------------------------------------------------

    doc

        .lineWidth(10)

        .strokeColor("#d4af37")

        .roundedRect(
            20,
            20,
            802,
            555,
            18
        )

        .stroke();

    // --------------------------------------------------
    // INNER GREEN BORDER
    // --------------------------------------------------

    doc

        .lineWidth(3)

        .strokeColor("#0f766e")

        .roundedRect(
            34,
            34,
            774,
            527,
            12
        )

        .stroke();

    // --------------------------------------------------
    // GOLD CORNERS
    // --------------------------------------------------

    doc.lineWidth(4);

    doc.moveTo(20,80).lineTo(20,20).lineTo(80,20).stroke("#d4af37");

    doc.moveTo(762,20).lineTo(822,20).lineTo(822,80).stroke("#d4af37");

    doc.moveTo(20,515).lineTo(20,575).lineTo(80,575).stroke("#d4af37");

    doc.moveTo(762,575).lineTo(822,575).lineTo(822,515).stroke("#d4af37");

    // --------------------------------------------------
    // TOP DECORATIVE LINE
    // --------------------------------------------------

    doc

        .moveTo(120,95)

        .lineTo(722,95)

        .lineWidth(2)

        .strokeColor("#d4af37")

        .stroke();

    // --------------------------------------------------
    // BOTTOM DECORATIVE LINE
    // --------------------------------------------------

    doc

        .moveTo(120,500)

        .lineTo(722,500)

        .stroke();

    // --------------------------------------------------
    // SCHOOL LOGO
    // --------------------------------------------------

    try {

        doc.image(
            LOGO,
            55,
            40,
            {
                width: 78
            }
        );

    } catch (err) {}

        // ==========================================================
    // HEADER
    // ==========================================================

    doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .fillColor("#1f2937")
        .text(
            "FEDERAL REPUBLIC OF NIGERIA",
            0,
            45,
            {
                align: "center"
            }
        );

    doc
        .font("Helvetica-Bold")
        .fontSize(31)
        .fillColor("#065f46")
        .text(
            "JOMADE HUDIYAH SCHOOL",
            0,
            70,
            {
                align: "center"
            }
        );

    doc
        .font("Helvetica-Bold")
        .fontSize(17)
        .fillColor("#2563eb")
        .text(
            "ANNUAL INTER-HOUSE QUIZ COMPETITION",
            0,
            108,
            {
                align: "center"
            }
        );

    // ==========================================================
    // GOLD RIBBON
    // ==========================================================

    doc
        .roundedRect(
            250,
            145,
            340,
            36,
            10
        )
        .fill("#b8860b");

    doc
        .fillColor("white")
        .font("Helvetica-Bold")
        .fontSize(15)
        .text(
            "EXCELLENCE • KNOWLEDGE • SUCCESS",
            250,
            157,
            {
                width: 340,
                align: "center"
            }
        );

    // ==========================================================
    // CERTIFICATE TITLE
    // ==========================================================

    doc
        .font("Helvetica-Bold")
        .fontSize(28)
        .fillColor("#b8860b")
        .text(
            "CERTIFICATE OF PARTICIPATION",
            0,
            205,
            {
                align: "center"
            }
        );

    // ==========================================================
    // PRESENTED TO
    // ==========================================================

    doc
        .font("Helvetica")
        .fontSize(16)
        .fillColor("#4b5563")
        .text(
            "This prestigious certificate is proudly presented to",
            0,
            245,
            {
                align: "center"
            }
        );

    // ==========================================================
    // STUDENT NAME
    // ==========================================================

    doc
        .font("Helvetica-BoldOblique")
        .fontSize(34)
        .fillColor("#0b57d0")
        .text(
            participant.name,
            0,
            275,
            {
                align: "center"
            }
        );

    // ==========================================================
    // GOLD UNDERLINE
    // ==========================================================

    doc
        .moveTo(180, 322)
        .lineTo(662, 322)
        .lineWidth(1.5)
        .strokeColor("#d4af37")
        .stroke();

    // ==========================================================
    // APPRECIATION TEXT
    // ==========================================================

    doc
        .font("Helvetica")
        .fontSize(15)
        .fillColor("#111827")
        .text(
            "For outstanding performance, dedication and participation in the Jomade Hudiyah School Quiz Competition.",
            110,
            340,
            {
                width: 620,
                align: "center"
            }
        );
            // ==========================================================
    // SCORE BOX
    // ==========================================================

    doc
        .roundedRect(70, 395, 200, 80, 10)
        .fillAndStroke("#e8f5e9", "#2e7d32");

    doc
        .fillColor("#065f46")
        .font("Helvetica-Bold")
        .fontSize(15)
        .text(
            "FINAL SCORE",
            70,
            410,
            {
                width: 200,
                align: "center"
            }
        );

    doc
        .fillColor("#111")
        .fontSize(30)
        .text(
            String(participant.score),
            70,
            435,
            {
                width: 200,
                align: "center"
            }
        );



    // ==========================================================
    // PERCENTAGE BOX
    // ==========================================================

    doc
        .roundedRect(321, 395, 200, 80, 10)
        .fillAndStroke("#fff8e1", "#d4af37");

    doc
        .fillColor("#8b5e00")
        .font("Helvetica-Bold")
        .fontSize(15)
        .text(
            "PERCENTAGE",
            321,
            410,
            {
                width: 200,
                align: "center"
            }
        );

    doc
        .fillColor("#111")
        .fontSize(30)
        .text(
            participant.percentage + "%",
            321,
            435,
            {
                width: 200,
                align: "center"
            }
        );



    // ==========================================================
    // POSITION BOX
    // ==========================================================

    doc
        .roundedRect(572, 395, 200, 80, 10)
        .fillAndStroke("#e3f2fd", "#1565c0");

    doc
        .fillColor("#0d47a1")
        .font("Helvetica-Bold")
        .fontSize(15)
        .text(
            "POSITION",
            572,
            410,
            {
                width: 200,
                align: "center"
            }
        );

    doc
        .fillColor("#111")
        .fontSize(30)
        .text(
            String(participant.position),
            572,
            435,
            {
                width: 200,
                align: "center"
            }
        );
            // ==========================================================
    // COMPETITION DATE
    // ==========================================================

    doc
        .font("Helvetica")
        .fontSize(14)
        .fillColor("#111827")
        .text(
            `Competition Date: ${new Date().toLocaleDateString()}`,
            0,
            490,
            {
                align: "center"
            }
        );



    // ==========================================================
    // OFFICIAL GOLD SEAL
    // ==========================================================

    doc.save();

    doc.circle(730, 485, 35)
        .fill("#d4af37");

    doc.circle(730, 485, 29)
        .fill("#fff4b2");

    doc.circle(730, 485, 23)
        .fill("#d4af37");

    doc
        .fillColor("#6b4f00")
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(
            "OFFICIAL\nSEAL",
            707,
            477,
            {
                width: 46,
                align: "center"
            }
        );

    doc.restore();



    // ==========================================================
    // LEFT SIGNATURE
    // ==========================================================

    doc.moveTo(95,535)
        .lineTo(265,535)
        .strokeColor("#111")
        .lineWidth(1)
        .stroke();

    doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor("#111")
        .text(
            "School Coordinator",
            105,
            540
        );



    // ==========================================================
    // RIGHT SIGNATURE
    // ==========================================================

    doc.moveTo(575,535)
        .lineTo(745,535)
        .stroke();

    doc
        .font("Helvetica")
        .fontSize(12)
        .text(
            "Principal",
            628,
            540
        );



    // ==========================================================
    // FOOTER
    // ==========================================================

    doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#475569")
        .text(
            "Powered by OYAJARE PRO TECHNOLOGY",
            0,
            565,
            {
                align: "center"
            }
        );

    doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#475569")
        .text(
            "CEO: Oyewole Abdullah • Official Developer of the Jomade Hudiyah School Quiz Competition System",
            0,
            579,
            {
                align: "center"
            }
        );

}
exports.generateCertificatePDF = async (req,res)=>{
    try {

        const participant = await Participant.findById(req.params.id);
        console.log(participant);


        if (!participant) {

            return res.status(404).json({

                message: "Participant not found"

            });

        }

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(

            "Content-Disposition",

            `inline; filename="${participant.name}-Certificate.pdf"`

        );

        const doc = new PDFDocument({

            layout: "landscape",

            size: "A4",

            margin: 0

        });

        doc.pipe(res);

        drawCertificate(doc, participant);

        doc.end();

    }

    catch(err){

        res.status(500).json({

            message: err.message

        });

    }

};
exports.generateCertificate = async (req,res)=>{

    try{

        const participant = await Participant.findById(req.params.id);

        if(!participant){

            return res.status(404).json({
                message:"Participant not found"
            });

        }

        res.json({

            _id: participant._id,

            name: participant.name,

            score: participant.score,

            percentage: participant.percentage,

            position: participant.position,

            certificateNumber: participant.certificateId

        });

    }

    catch(err){

        res.status(500).json({
            message: err.message
        });

    }

};
exports.downloadAllCertificates = async (req, res) => {

    try {

        const participants = await Participant
            .find()
            .sort({ score: -1 });

        const Question = require("../models/Question");

const totalQuestions =
    await Question.countDocuments({

        active:true

    });

        // ----------------------------------
        // ZIP DOWNLOAD
        // ----------------------------------

        res.attachment("Certificates.zip");

        const archive = archiver("zip", {

            zlib: { level: 9 }

        });

        archive.pipe(res);

        // ----------------------------------
        // LOOP THROUGH PARTICIPANTS
        // ----------------------------------

        for (let i = 0; i < participants.length; i++) {

            const participant = participants[i];

            participant.position = i + 1;

            const Competition = require("../models/Competition");

const settings = await Competition.findOne();

const maxScorePerQuestion =
    settings?.maxScore || 100;

const maxPossibleScore =
    totalQuestions * maxScorePerQuestion;

participant.percentage =
    maxPossibleScore > 0
        ? Math.round(
            (participant.score / maxPossibleScore) * 100
        )
        : 0;

            await participant.save();

            const doc = new PDFDocument({

                layout: "landscape",

                size: "A4",

                margin: 0

            });

            const buffers = [];

            doc.on("data", chunk => {

                buffers.push(chunk);

            });

            await new Promise(resolve => {

                doc.on("end", () => {

                    archive.append(

                        Buffer.concat(buffers),

                        {

                            name: `${participant.name} Certificate.pdf`

                        }

                    );

                    resolve();

                });

                // ----------------------------------
                // DRAW BEAUTIFUL CERTIFICATE
                // ----------------------------------

                drawCertificate(doc, participant);

                doc.end();

            });

        }

        // ----------------------------------

        await archive.finalize();

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
