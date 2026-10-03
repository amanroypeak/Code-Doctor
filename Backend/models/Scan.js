import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    projectName: {
        type: String
    },

    summary: {
        total: Number,
        high: Number,
        low: Number
    },

    results: [
        {
            type: { type: String },
            severity: String,
            file: String,
            line: Number,
            message: String,
            code: String
        }
    ],

    aiAnalysis: {
        type: String
    }

}, { timestamps: true });

export default mongoose.model("Scan", scanSchema);