import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../services/socket";

export default function AwardCeremony() {

    const navigate = useNavigate();

    useEffect(() => {

        socket.on("show-leaderboard", () => {

            navigate("/admin/leaderboard");

        });

        socket.on("show-podium", () => {

            navigate("/admin/podium");

        });

        socket.on("show-finale", () => {

            navigate("/admin/finale");

        });

        return () => {

            socket.off("show-leaderboard");

            socket.off("show-podium");

            socket.off("show-finale");

        };

    }, []);

    return null;

}