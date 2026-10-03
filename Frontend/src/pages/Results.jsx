import { useState, useEffect, useContext } from "react";
import { useLocation, useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { getScanById } from "../api.js";

function Results() {

    const [fetchedScan, setFetchedScan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();

    const { id } = useParams();

    const { user, token, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchScan = async () => {

            try {
                setLoading(true);
                setErrorMessage("");

                const data = await getScanById(id, token);

                setFetchedScan(data.scan);

            } catch (error) {
                console.error("Fetch scan error:", error);

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

        if (id && token) {
            fetchScan();
        }

    }, [id, token]);

    // Scan kholne ke liye login zaroori hai (Dashboard wale route ke liye)
    if (id && !user) {
        return <Navigate to="/auth" />;
    }

    if (loading) {
        return (
            <div className="mt-20 flex items-center justify-center gap-3 text-slate-400">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></span>
                Loading scan...
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="mx-auto max-w-xl px-6 py-20 text-center">

                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {errorMessage}
                </div>

                <Link
                    to="/dashboard"
                    className="mt-6 inline-block rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-emerald-400"
                >
                    Back to Dashboard
                </Link>

            </div>
        );
    }

    // Data do jagah se aa sakta hai:
    // 1. Dashboard se kholne par: database se (fetchedScan)
    // 2. Abhi scan karke aane par: Scan page se (location.state)
    let scanData = location.state?.scanData;

    if (id) {
        scanData = fetchedScan;
    }

    if (!scanData) {
        return (
            <div className="mx-auto max-w-xl px-6 py-20 text-center">

                <div className="text-5xl">
                    📭
                </div>

                <h1 className="mt-4 text-3xl font-bold text-slate-100">
                    No results to show
                </h1>

                <p className="mt-2 text-slate-400">
                    Please scan a project first.
                </p>

                <Link
                    to="/scan"
                    className="mt-6 inline-block rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-emerald-400"
                >
                    Go to Scan
                </Link>

            </div>
        );
    }

    const summary = scanData.summary;
    const results = scanData.results;
    const aiAnalysis = scanData.aiAnalysis;

    const getBorderClass = (severity) => {

        if (severity === "high") {
            return "border-l-red-500";
        }

        return "border-l-amber-400";
    };

    const getBadgeClass = (severity) => {

        if (severity === "high") {
            return "bg-red-500/10 text-red-300";
        }

        return "bg-amber-400/10 text-amber-300";
    };

    // Banner sirf tab dikhega jab abhi scan karke aaye hain (id nahi hai)
    let banner = null;

    if (!id) {

        if (!user) {
            banner = (
                <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm text-sky-200">
                    You scanned as a guest, so this scan won't be saved.{" "}
                    <Link to="/auth" className="font-semibold underline">
                        Log in
                    </Link>{" "}
                    to keep your scans in your dashboard.
                </div>
            );
        } else if (scanData.saved) {
            banner = (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    ✅ Saved to your dashboard.
                </div>
            );
        } else {
            banner = (
                <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                    This scan could not be saved to your dashboard.
                </div>
            );
        }
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

            {/* Heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-3xl font-extrabold text-slate-100">
                        Scan{" "}
                        <span className="bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                            results
                        </span>
                    </h1>

                    {scanData.projectName && (
                        <p className="mt-2 break-all text-slate-400">
                            📦 {scanData.projectName}
                        </p>
                    )}
                </div>

                <Link
                    to="/scan"
                    className="w-full rounded-lg border border-slate-600 px-5 py-2 text-center font-semibold text-slate-200 transition hover:bg-slate-800 sm:w-auto"
                >
                    Scan another project
                </Link>

            </div>

            {banner}

            {/* Summary cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 text-center">
                    <h2 className="text-4xl font-bold text-slate-100">
                        {summary.total}
                    </h2>
                    <p className="mt-1 text-slate-400">Total issues</p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 text-center">
                    <h2 className="text-4xl font-bold text-red-400">
                        {summary.high}
                    </h2>
                    <p className="mt-1 text-slate-400">High severity</p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 text-center">
                    <h2 className="text-4xl font-bold text-amber-300">
                        {summary.low}
                    </h2>
                    <p className="mt-1 text-slate-400">Low severity</p>
                </div>

            </div>

            {/* Issues list */}
            <h2 className="mt-12 text-2xl font-semibold text-slate-100">
                Issues found
            </h2>

            {results.length === 0 && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-300">
                    ✅ No issues found. Great job!
                </div>
            )}

            {results.map((issue, index) => (
                <div
                    key={index}
                    className={`mt-4 rounded-xl border border-slate-700 border-l-4 bg-slate-800 p-4 sm:p-5 ${getBorderClass(issue.severity)}`}
                >

                    <div className="flex flex-wrap items-center gap-2">

                        <span className="wrap-break-word font-semibold text-slate-100">
                            {issue.type}
                        </span>

                        <span className={`rounded-full px-3 py-0.5 text-xs font-medium uppercase ${getBadgeClass(issue.severity)}`}>
                            {issue.severity}
                        </span>

                    </div>

                    <p className="mt-2 break-all text-sm text-slate-400">
                        📄 {issue.file} (line {issue.line})
                    </p>

                    <p className="mt-3 wrap-break-word text-slate-300">
                        {issue.message}
                    </p>

                    <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-sm text-slate-200">
                        {issue.code}
                    </pre>

                </div>
            ))}

            {/* AI analysis */}
            <h2 className="mt-12 text-2xl font-semibold text-slate-100">
                🤖 AI analysis
            </h2>

            {aiAnalysis ? (
                <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
                    <pre className="whitespace-pre-wrap wrap-break-word font-sans text-sm leading-relaxed text-slate-200">
                        {aiAnalysis}
                    </pre>
                </div>
            ) : (
                <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800 p-5 text-slate-400">
                    AI analysis is not available right now.
                </div>
            )}

        </div>
    );
}

export default Results;