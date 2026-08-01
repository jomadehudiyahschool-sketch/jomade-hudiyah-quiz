const express = require("express");
const cors = require("cors");
const certificateRoutes = require("./routes/certificateRoutes");
const adminRoutes = require("./routes/adminRoutes");
const participantRoutes = require("./routes/participantRoutes");
const competitionRoutes = require("./routes/competitionRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");

const app = express();

/* ===========================
   Middlewares
=========================== */

app.use(cors());

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ===========================
   API Routes
=========================== */

app.use("/api/admin", adminRoutes);

app.use("/api/participants", participantRoutes);

app.use("/api/competition", competitionRoutes);

app.use("/api/quiz", quizRoutes);

app.use("/api/questions", questionRoutes);

app.use("/api/answers", answerRoutes);

app.use("/api/certificates", certificateRoutes);



/* ===========================
   Home Route
=========================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    application: "Jomade Hudiyah School Quiz Competition",
    version: "1.0.0",
    developer: "Oyajare Pro Technology",
    ceo: "OYEWOLE ABDULLAH",
    status: "Server Running",
  });
});

/* ===========================
   404 Route
=========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

/* ===========================
   Error Handler
=========================== */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;