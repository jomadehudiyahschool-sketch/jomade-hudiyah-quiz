import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../services/socket";

export default function Waiting() {
  const [participant, setParticipant] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("participant"));

    if (!stored) {
      window.location.href = "/join";
      return;
    }

    setParticipant(stored);

    loadParticipants();

    // Live participant updates
    socket.on("players-updated", (players) => {
      setParticipants(players);
    });

    // Admin starts quiz
    socket.on("quiz-started", () => {
      window.location.href = "/quiz";
    });

    // Removed by admin
    socket.on("removed", () => {
      alert("The administrator removed you from this competition.");

      localStorage.removeItem("participant");

      window.location.href = "/join";
    });

    return () => {
      socket.off("players-updated");
      socket.off("quiz-started");
      socket.off("removed");
    };
  }, []);

  const loadParticipants = async () => {
    try {
      const res = await axios.get(
        "https://jomade-hudiyah-backend.onrender.com/api/participants"
      );

      setParticipants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">

      <div className="bg-slate-800 rounded-3xl p-10 w-[650px]">

        <h1 className="text-4xl font-bold text-center">
          🏫 Waiting Room
        </h1>

        <p className="text-center mt-5 text-xl">
          Welcome
        </p>

        <h2 className="text-center text-3xl text-green-400 font-bold mt-2">
          {participant?.name}
        </h2>

        <div className="mt-10">

          <h3 className="text-2xl font-bold">
            Participants Joined ({participants.length})
          </h3>

          <div className="mt-5 bg-slate-700 rounded-xl p-5 max-h-80 overflow-y-auto">

            {participants.length === 0 ? (
              <p>No participant has joined.</p>
            ) : (
              participants.map((player, index) => (
                <div
                  key={player._id}
                  className="flex justify-between border-b border-slate-600 py-3"
                >
                  <span>
                    {index + 1}. {player.name}
                  </span>

                  <span className="text-green-400">
                    {player.connected ? "🟢 Online" : "🔴 Offline"}
                  </span>
                </div>
              ))
            )}

          </div>

        </div>

        <div className="text-center mt-10 animate-pulse text-yellow-300 text-lg">
          Waiting for the administrator to start the competition...
        </div>

      </div>

    </div>
  );
}