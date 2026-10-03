import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { scanProject } from "../api.js";
import { AuthContext } from "../context/AuthContext.jsx";

function Scan() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        setSelectedFile(file);
        setErrorMessage("");
    };

    const handleScan = async () => {

        if (!selectedFile) {
            setErrorMessage("Please choose a zip file first");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");

            const data = await scanProject(selectedFile, token);

            navigate("/results", { state: { scanData: data } });

        } catch (error) {
            console.error("Scan error:", error);

            if (error.response) {
                setErrorMessage(`Server error: ${error.response.data.message}`);
            } else {
                setErrorMessage("Cannot reach the server. Is the backend running?");
            }
        } finally {
            setLoading(false);
        }
    };

    let fileSizeInMB = "";

    if (selectedFile) {
        fileSizeInMB = (selectedFile.size / 1024 / 1024).toFixed(2);
    }

    return (
        <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">

            {/* Heading */}
            <div className="text-center">

                <h1 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">
                    Scan your{" "}
                    <span className="bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                        project
                    </span>
                </h1>

                <p className="mt-3 text-slate-400">
                    Upload your project as a .zip file and let Code Doctor find the problems.
                </p>

            </div>

            {/* Upload card */}
            <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8">

                {/* Upload area */}
                <label
                    htmlFor="zipInput"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-600 px-4 py-10 text-center transition hover:border-emerald-400 hover:bg-slate-700/40"
                >
                    <span className="text-5xl">
                        {selectedFile ? "📦" : "📁"}
                    </span>

                    {selectedFile ? (
                        <>
                            <p className="mt-4 break-all font-semibold text-emerald-300">
                                {selectedFile.name}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                {fileSizeInMB} MB. Click to choose a different file.
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="mt-4 font-semibold text-slate-200">
                                Click to choose a zip file
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Only .zip files are supported
                            </p>
                        </>
                    )}
                </label>

                <input
                    id="zipInput"
                    type="file"
                    accept=".zip"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Scan button */}
                <button
                    onClick={handleScan}
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-400"
                >
                    {loading && (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></span>
                    )}

                    {loading ? "Scanning your project..." : "Scan project"}
                </button>

                {loading && (
                    <p className="mt-3 text-center text-sm text-slate-400">
                        AI analysis can take a little while. Please don't close this page.
                    </p>
                )}

                {/* Error message */}
                {errorMessage && (
                    <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {errorMessage}
                    </div>
                )}

            </div>

            {/* Tips */}
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800/50 p-5">

                <h2 className="font-semibold text-slate-200">
                    Tips for best results
                </h2>

                <ul className="mt-3 space-y-2 text-sm text-slate-400">
                    <li>✔ Zip the project folder itself, not the files one by one</li>
                    <li>✔ Remove node_modules before zipping to keep the file small</li>
                    <li>✔ Larger projects take longer to analyze</li>
                </ul>

            </div>

        </div>
    );
}

export default Scan;