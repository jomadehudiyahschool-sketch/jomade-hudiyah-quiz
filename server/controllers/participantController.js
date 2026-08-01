const Participant = require("../models/Participant");

// ============================
// JOIN QUIZ
// ============================

exports.joinQuiz = async (req, res) => {
    try {

        const { name } = req.body;

        if (!name || name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Please enter your full name."
            });
        }

        const participant = await Participant.create({
            name: name.trim(),
            connected: false,
            socketId: "",
            score: 0,
            percentage: 0,
            position: 0,
            currentQuestion: 0,
            answered: false,
            certificate: ""
        });

        res.status(201).json({
            success: true,
            participant
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ============================
// GET PARTICIPANTS
// ============================

exports.getParticipants = async (req, res) => {

    try {

        const participants = await Participant
            .find()
            .sort({
                createdAt: 1
            });

        res.json(participants);

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ============================
// DELETE PARTICIPANT
// ============================

exports.deleteParticipant = async (req, res) => {

    try {

        const participant = await Participant.findById(req.params.id);

        if (!participant) {

            return res.status(404).json({

                success: false,

                message: "Participant not found"

            });

        }

        const io = req.app.get("io");

        if (io && participant.socketId) {

            const socket = io.sockets.sockets.get(participant.socketId);

            if (socket) {

                socket.emit("removed");

                socket.disconnect(true);

            }

        }

        await Participant.findByIdAndDelete(req.params.id);

        if (io) {

            const players = await Participant
                .find()
                .sort({
                    createdAt: 1
                });

            io.emit("players-updated", players);

        }

        res.json({

            success: true,

            message: "Participant removed successfully."

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};