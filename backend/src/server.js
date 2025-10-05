import express from 'express';
const app = express();

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000 ;

import authRoutes from "./routes/auth.route.js"; 
import messageRoutes from "./routes/message.route.js"; 


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);



app.listen(PORT, () => console.log("sever is running on port 3000: " + PORT));