import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getTokenFromRequest = (req) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return null;
    }

    if (!authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];

    return token;
};

export const optionalAuth = async (req, res, next) => {

    try {

        const token = getTokenFromRequest(req);

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        req.user = user;

        next();

    } catch (error) {

        console.log("Optional auth: invalid token, continuing as guest");

        req.user = null;

        next();
    }
};

export const requireAuth = async (req, res, next) => {

    try {

        const token = getTokenFromRequest(req);

        if (!token) {
            return res.status(401).json({
                message: "Please log in to continue"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.error("Auth error:", error.message);

        res.status(401).json({
            message: "Invalid or expired token. Please log in again"
        });
    }
};