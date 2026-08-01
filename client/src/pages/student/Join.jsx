import { useState } from "react";
import axios from "axios";
import socket from "../../services/socket";

export default function Join() {
  const [name, setName] = useState("");

  const joinQuiz = async () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/participants/join",
        {
          name: name.trim(),
        }
      );

      localStorage.setItem(
    "participant",
    JSON.stringify(res.data.participant)
);

localStorage.setItem(
    "participantId",
    res.data.participant._id
);

      // Tell server this participant is online
      socket.emit("student-join", {
        id: res.data.participant._id,
        name: res.data.participant.name,
      });

      // Redirect to waiting room
      window.location.href = "/waiting";
    } catch (err) {
      alert(err.response?.data?.message || "Unable to join.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">
      <div className="bg-white rounded-3xl p-10 shadow-2xl w-[430px]">

        <h1 className="text-3xl font-bold text-center">
          🏫
        </h1>

        <h2 className="text-center text-xl font-bold mt-4">
          Jomade Hudiyah School
        </h2>

        <p className="text-center text-gray-500">
          Quiz Competition
        </p>

        <input
          className="w-full border rounded-xl p-4 mt-8"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={joinQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-6 rounded-xl p-4 font-bold"
        >
          Join Competition
        </button>

      </div>
    </div>
  );
}