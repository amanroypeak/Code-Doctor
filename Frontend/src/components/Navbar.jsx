import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {

        logout();

        closeMenu();

        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-emerald-500/20 bg-slate-950/90 backdrop-blur">

            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-xl font-bold text-emerald-400"
                >
                    🩺 Code Doctor
                </Link>

                {/* Links for bigger screens */}
                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        to="/"
                        className="text-slate-300 transition hover:text-emerald-400"
                    >
                        Home
                    </Link>

                    <Link
                        to="/scan"
                        className="text-slate-300 transition hover:text-emerald-400"
                    >
                        Scan
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-slate-300 transition hover:text-emerald-400"
                            >
                                Dashboard
                            </Link>

                            <span className="text-sm text-slate-400">
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-200 transition hover:bg-slate-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/auth"
                            className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-400"
                        >
                            Login
                        </Link>
                    )}

                </div>

                {/* Hamburger button for phones */}
                <button
                    onClick={toggleMenu}
                    className="text-2xl text-slate-300 md:hidden"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </div>

            {/* Dropdown menu for phones */}
            {menuOpen && (
                <div className="flex flex-col gap-4 border-t border-slate-800 px-6 py-4 md:hidden">

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-slate-300 hover:text-emerald-400"
                    >
                        Home
                    </Link>

                    <Link
                        to="/scan"
                        onClick={closeMenu}
                        className="text-slate-300 hover:text-emerald-400"
                    >
                        Scan
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={closeMenu}
                                className="text-slate-300 hover:text-emerald-400"
                            >
                                Dashboard
                            </Link>

                            <p className="text-sm text-slate-400">
                                Logged in as {user.name}
                            </p>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-200 hover:bg-slate-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/auth"
                            onClick={closeMenu}
                            className="rounded-lg bg-emerald-500 px-4 py-2 text-center font-semibold text-slate-900 hover:bg-emerald-400"
                        >
                            Login
                        </Link>
                    )}

                </div>
            )}

        </nav>
    );
}

export default Navbar;