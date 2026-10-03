import express, { Router } from "express"
import multer from "multer"
import { scanProject } from "../controllers/scanController.js"
import { optionalAuth } from "../middleware/authMiddleware.js"

const router = express.Router()

const upload =  multer ({
    dest:"upload/"
})

router.post("/scan", optionalAuth , upload.single("project"), scanProject)

export default router;