import express from "express"
import { scanFolder } from "./scanner/scanner.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import scanRoute from "./routes/scanRoute.js";
import authRoute from "./routes/authRoute.js";
import historyRoute from "./routes/historyRoute.js";
import { connectDB } from "./config/db.js"

const app = express()

app.use(cors())
app.use(express.json());

const PORT = 5000

app.get("/", (req, res) => {
    res.send("Server running")
})

app.get("/scan", (req, res) => {
    const folderpath = req.query.path
    const result = scanFolder(folderpath)
    res.json(result)

})

app.use("/api", scanRoute)
app.use("/api/auth", authRoute)
app.use("/api/scans", historyRoute)

const startServer = async () => {

    await connectDB();

    app.listen(PORT, () => {
        console.log(`server is running at the port ${PORT}`)
    })
};

startServer();