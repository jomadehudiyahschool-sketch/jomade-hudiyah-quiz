require("dotenv").config();

const timer = require("./services/timer");
const connectDB = require("./config/database");
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const Participant = require("./models/Participant");
const quizEngine = require("./services/quizEngine");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
timer.setIO(io);

// Make socket available everywhere
app.set("io", io);

// Connect MongoDB
connectDB();

// ================= SOCKET =================

io.on("connection", (socket) => {

    console.log("🟢 Connected:", socket.id);

    // Student joins
    socket.on("student-join", async (data) => {

        try {

            if (!data || !data.id) return;

            await Participant.findByIdAndUpdate(
                data.id,
                {
                    socketId: socket.id,
                    connected: true
                }
            );

            const players = await Participant
                .find()
                .sort({ createdAt: 1 });

            io.emit("players-updated", players);

            console.log("🎓 Student Joined:", data.name);
            console.log("👨‍🎓 Players Connected:", players.length);

            socket.emit(
    "quiz-status",
    quizEngine.status()
);
        } catch (err) {

            console.log(err.message);

        }

    });

    // Disconnect
    socket.on("disconnect", async () => {

        try {

            await Participant.findOneAndUpdate(
                {
                    socketId: socket.id
                },
                {
                    connected: false,
                    socketId: ""
                }
            );

            const players = await Participant
                .find()
                .sort({ createdAt: 1 });

            io.emit("players-updated", players);

            console.log("🔴 Disconnected:", socket.id);

        } catch (err) {

            console.log(err.message);

        }

    });

});

// ===========================================

server.listen(PORT, () => {

    console.log("=================================");
    console.log("🏫 Jomade Hudiyah School Quiz Competition");
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("Powered by Oyajare Pro Technology");
    console.log("CEO: OYEWOLE ABDULLAH");
    console.log("=================================");

});