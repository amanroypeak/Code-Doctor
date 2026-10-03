import mongoose from "mongoose";
import Scan from "../models/Scan.js";

export const getMyScans = async (req, res) => {

    try {

        const scans = await Scan
            .find({ user: req.user._id })
            .select("projectName summary createdAt")
            .sort({ createdAt: -1 });

        res.json({
            message: "Scans fetched successfully",
            scans: scans
        });

    } catch (error) {

        console.error("Get scans error:", error);

        res.status(500).json({
            message: "Could not fetch scans",
            error: error.message
        });
    }
};

export const getScanById = async (req, res) => {

    try {

        const scanId = req.params.id;

        const idIsValid = mongoose.Types.ObjectId.isValid(scanId);

        if (!idIsValid) {
            return res.status(400).json({
                message: "Invalid scan id"
            });
        }

        const scan = await Scan.findOne({
            _id: scanId,
            user: req.user._id
        });

        if (!scan) {
            return res.status(404).json({
                message: "Scan not found"
            });
        }

        res.json({
            message: "Scan fetched successfully",
            scan: scan
        });

    } catch (error) {

        console.error("Get scan error:", error);

        res.status(500).json({
            message: "Could not fetch scan",
            error: error.message
        });
    }
};