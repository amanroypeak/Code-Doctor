import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Auth() {

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login, register } = useContext(AuthContext);

    const navigate = useNavigate();

    const switchMode = () => {

        setIsLogin(!isLogin);
        setErrorMessage("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!email || !password) {
            setErrorMessage("Email and password are required");
            return;
        }

        if (!isLogin && !name) {
            setErrorMessage("Please enter your name");
            return;
        }

        if (!isLogin && password.length < 6) {
            setErrorMessage("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");

            if (isLogin) {
                const credentials = {
                    email: email,
                    password: password
                };

                await login(credentials);
            } else {
                const userDetails = {
                    name: name,
                    email: email,
                    password: password
                };

                await register(userDetails);
            }

            navigate("/dashboard");

        } catch (error) {
            console.error("Auth error:", error);

            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Cannot reach the server. Is the backend running?");
            }
        } finally {
            setLoading(false);
        }
    };

    let buttonText = "Create account";

    if (isLogin) {
        buttonText = "Log in";
    }

    if (loading) {
        buttonText = "Please wait...";
    }

    return (
        <div className="mx-auto max-w-md px-6 py-12 sm:py-16">

            {/* Heading */}
            <div className="text-center">

                <h1 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">
                    {isLogin ? "Welcome " : "Join "}
                    <span className="bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                        {isLogin ? "back" : "Code Doctor"}
                    </span>
                </h1>

                <p className="mt-3 text-slate-400">
                    {isLogin
                        ? "Log in to see your saved scans."
                        : "Create an account to save your scans."}
                </p>

            </div>

            {/* Form card */}
            <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8">

                <form onSubmit={handleSubmit} className="space-y-5">

                    {!isLogin && (
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-slate-300"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Your name"
                                className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-400"
                            />
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-300"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-300"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-400"
                        />
                    </div>

                    {errorMessage && (
                        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-400"
                    >
                        {buttonText}
                    </button>

                </form>

                {/* Switch between login and register */}
                <p className="mt-6 text-center text-sm text-slate-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}

                    <button
                        type="button"
                        onClick={switchMode}
                        className="font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Auth;