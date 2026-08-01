import { BrowserRouter, Routes, Route } from "react-router-dom";
import LiveLeaderboard from "../pages/admin/LiveLeaderboard";
import Home from "../pages/Home";

// Admin

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Participants from "../pages/admin/Participants";
import QuizManager from "../pages/admin/QuizManager";
import LiveQuiz from "../pages/admin/LiveQuiz";
import Settings from "../pages/admin/Settings";
import Results from "../pages/admin/Results";
import Questions from "../pages/admin/Questions";
import AddQuestion from "../pages/admin/AddQuestion";
import QRCode from "../pages/admin/QRCode";
import WinnerPodium from "../pages/admin/WinnerPodium";
import GrandFinale from "../pages/admin/GrandFinale";
import Certificate from "../pages/student/Certificate";
import Certificates from "../pages/admin/Certificates";

// Student
import Join from "../pages/student/Join";
import Waiting from "../pages/student/Waiting";
import Quiz from "../pages/student/Quiz";
import Leaderboard from "../pages/student/Leaderboard";
import Result from "../pages/student/Result";

import NotFound from "../pages/NotFound";

export default function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Home */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Admin */}
                
                <Route
                    path="/admin"
                    element={<Login />}
                />

                <Route
                    path="/admin/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/participants"
                    element={<Participants />}
                />

                <Route
                    path="/admin/quizzes"
                    element={<QuizManager />}
                />

                <Route
                    path="/admin/live"
                    element={<LiveQuiz />}
                />
                <Route
    path="/admin/leaderboard"
    element={<LiveLeaderboard />}
/>

                <Route
                    path="/admin/settings"
                    element={<Settings />}
                />

                <Route
                    path="/admin/results"
                    element={<Results />}
                />
                <Route
    path="/admin/qrcode"
    element={<QRCode />}
/>
                <Route
    path="/admin/podium"
    element={<WinnerPodium />}
/>
<Route
    path="/admin/finale"
    element={<GrandFinale />}
/>
            <Route

    path="/admin/certificates"

    element={<Certificates />}

/>

                {/* Student */}

                <Route
                    path="/join"
                    element={<Join />}
                />

                <Route
                    path="/waiting"
                    element={<Waiting />}
                />

                <Route
                    path="/quiz"
                    element={<Quiz />}
                />

                <Route
                    path="/leaderboard"
                    element={<Leaderboard />}
                />

                <Route
                    path="/result"
                    element={<Result />}
                />
                <Route
    path="/certificate/:id"
    element={<Certificate />}
 />

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />
                <Route
    path="/admin/questions"
    element={<Questions />}
/>

<Route

    path="/admin/questions/add"

    element={<AddQuestion/>}

/>

            </Routes>

        </BrowserRouter>

    );

}