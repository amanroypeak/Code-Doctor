import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { getMyScans } from "../api.js";

function Dashboard() {

    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const { user, token, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchScans = async () => {

            try {
                setLoading(true);
                setErrorMessage("");

                const data = await getMyScans(token);

                setScans(data.scans);

            } catch (error) {
                console.error("Dashboard error:", error);

                if (error.response && error.response.status === 401) {
                    logout();
                    navigate("/auth");
                } else if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("Cannot reach the server. Is the backend running?");
                }
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchScans();
        }

    }, [token]);

    if (!user) {
        return <Navigate to="/auth" />;
    }

    const formatDate = (dateString) => {

        const date = new Date(dateString);

        return date.toLocaleString();
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

            {/* Heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-3xl font-extrabold text-slate-100">
                        Your{" "}
                        <span className="bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                            dashboard
                        </span>
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Welcome back, {user.name}. Here are your saved scans.
                    </p>
                </div>

                <Link
                    to="/scan"
                    className="w-full rounded-lg bg-emerald-500 px-5 py-2 text-center font-semibold text-slate-900 transition hover:bg-emerald-400 sm:w-auto"
                >
                    + New scan
                </Link>

            </div>

            {/* Loading */}
            {loading && (
                <div className="mt-12 flex items-center justify-center gap-3 text-slate-400">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></span>
                    Loading your scans...
                </div>
            )}

            {/* Error */}
            {errorMessage && (
                <div className="mt-8 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {errorMessage}
                </div>
            )}

            {/* Empty state */}
            {!loading && !errorMessage && scans.length === 0 && (
                <div className="mt-12 rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">

                    <div className="text-5xl">
                        📭
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-slate-100">
                        No scans yet
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Scan your first project and it will show up here.
                    </p>

                </div>
            )}

            {/* Scan cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {scans.map((scan) => (
                    <Link
                        key={scan._id}
                        to={`/results/${scan._id}`}
                        className="block rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-1 hover:border-emerald-500/50"
                    >

                        <h3 className="break-all font-semibold text-slate-100">
                            📦 {scan.projectName}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                            {formatDate(scan.createdAt)}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">

                            <span className="rounded-full bg-slate-700 px-3 py-1 text-slate-200">
                                {scan.summary.total} total
                            </span>

                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-red-300">
                                {scan.summary.high} high
                            </span>

                            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">
                                {scan.summary.low} low
                            </span>

                        </div>

                    </Link>
                ))}

            </div>

        </div>
    );
}

export default Dashboard;