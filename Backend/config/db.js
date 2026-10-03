import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb Connected");
        
    } catch (error) {
        console.log("MongoDB connection failed:", error.message)
        process.exit(1);
        
    }

}