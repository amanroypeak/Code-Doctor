import AdmZip from "adm-zip";
import { scanFolder } from "../scanner/scanner.js";
import { analyzeIssue } from "../ai/analyzeIssue.js";
import Scan from "../models/Scan.js";

export const scanProject = async (req, res) => {

    console.log("SCAN CONTROLLER CALLED");

    try {

        const zip = new AdmZip(req.file.path);

        const extractpath = `projects/${req.file.filename}`;

        zip.extractAllTo(extractpath, true);

        console.log("zip extracted successfully");

        const results = scanFolder(extractpath);

        const highseverity = results.filter(
            (item) => item.severity === "high"
        );

        const lowseverity = results.filter(
            (item) => item.severity === "low"
        );

        let aiAnalysis = null;

        console.log(results);

        if (results.length > 0) {
            try {
                aiAnalysis = await analyzeIssue(results);
            } catch (error) {
                console.error("Gemini Error:", error);      //inner try-catch, if gemini service fails, still results will be displayed
                aiAnalysis = null;
            }
        }

        const summary = {
            total: results.length,
            high: highseverity.length,
            low: lowseverity.length
        };

        let saved = false;

        if (req.user) {
            try {
                await Scan.create({
                    user: req.user._id,
                    projectName: req.file.originalname,
                    summary: summary,
                    results: results,
                    aiAnalysis: aiAnalysis
                });

                saved = true;

                console.log("Scan saved for user:", req.user.email);

            } catch (error) {
                console.error("Scan save error:", error);
                saved = false;
            }
        }

        res.json({
            message: "project scanned successfully",

            summary: summary,

            results: results,

            aiAnalysis: aiAnalysis,

            saved: saved
        });

    } catch (error) {

        console.error("Error:", error);

        res.status(503).json({
            message: "Project scanning or Gemini service failed",
            error: error.message
        });
    }
};