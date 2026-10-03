import { Link } from "react-router-dom";

function Home() {

    const steps = [
        {
            number: "1",
            title: "Upload",
            text: "Choose your project folder as a .zip file and upload it."
        },
        {
            number: "2",
            title: "Scan",
            text: "Code Doctor analyzes every file in your project and flags code quality issues."
        },
        {
            number: "3",
            title: "Fix",
            text: "Get a clear AI explanation and corrected code for every issue."
        }
    ];

    const features = [
        {
            icon: "🔍",
            title: "Smart scanning",
            text: "Finds problems in your code with the exact file and line number."
        },
        {
            icon: "🚦",
            title: "Severity levels",
            text: "Issues are marked high or low, so you know what to fix first."
        },
        {
            icon: "🤖",
            title: "AI explanations",
            text: "Understand why the code is a problem and how to fix it."
        }
    ];

    return (
        <div>

            {/* Hero section */}
            <section className="bg-linear-to-b from-slate-800 to-slate-900 px-6 py-16 text-center sm:py-24">

                <div className="mx-auto max-w-3xl">

                    <span className="inline-block rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-300">
                        Javasript Code Health Checkup
                    </span>

                    <h1 className="mt-6 text-3xl font-extrabold text-slate-100 sm:text-5xl md:text-6xl">
                        Catch code issues{" "}
                        <span className="bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                            before they reach production
                        </span>
                    </h1>
                    <p className="mt-6 text-base text-slate-400 sm:text-lg md:text-xl">
                        Upload your project as a zip file. Code Doctor scans it for
                        problems and uses AI to explain how to fix them.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                        <Link
                            to="/scan"
                            className="w-full rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-emerald-400 sm:w-auto"
                        >
                            Scan my project
                        </Link>

                        <a
                            href="#how-it-works"
                            className="w-full rounded-lg border border-slate-600 px-8 py-3 font-semibold text-slate-200 transition hover:bg-slate-800 sm:w-auto"
                        >
                            How it works
                        </a>

                    </div>

                </div>

            </section>

            {/* How it works section */}
            <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-16">

                <h2 className="text-center text-2xl font-bold text-slate-100 sm:text-3xl">
                    How it works
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center transition hover:-translate-y-1 hover:border-emerald-500/50"
                        >
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-slate-900">
                                {step.number}
                            </div>

                            <h3 className="mt-4 text-xl font-semibold text-slate-100">
                                {step.title}
                            </h3>

                            <p className="mt-2 text-slate-400">
                                {step.text}
                            </p>
                        </div>
                    ))}

                </div>

            </section>

            {/* Features section */}
            <section className="bg-slate-800/50 px-6 py-16">

                <div className="mx-auto max-w-5xl">

                    <h2 className="text-center text-2xl font-bold text-slate-100 sm:text-3xl">
                        Why Code Doctor?
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-xl border border-slate-700 bg-slate-900 p-6"
                            >
                                <div className="text-3xl">
                                    {feature.icon}
                                </div>

                                <h3 className="mt-3 text-lg font-semibold text-slate-100">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-slate-400">
                                    {feature.text}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* Final call to action */}
            <section className="px-6 py-16 text-center">

                <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
                    Ready to clean up your code?
                </h2>

                <Link
                    to="/scan"
                    className="mt-6 inline-block rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-emerald-400"
                >
                    Start scanning
                </Link>

            </section>

        </div>
    );
}

export default Home;