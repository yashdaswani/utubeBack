import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/Users.js";
import videoRoutes from "./routes/Videos.js";
import commentRoutes from "./routes/Comments.js";
import cookieParser from "cookie-parser"
const app=express();
dotenv.config();
const connect=()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("DB connected");
    })
    .catch((err)=>{
        throw err;
    })
}
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/comments", commentRoutes);
app.use((err,req,res,next)=>{
    const status=err.status || 500
    const message=err.message || "500"
    return res.status(status).json({
        success:false,
        status,message
    })
})
app.listen(process.env.PORT || 8000,()=>{
    connect()
    console.log("connected");
})
