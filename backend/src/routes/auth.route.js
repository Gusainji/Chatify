import express from 'express';
import { signup } from '../controllers/auth.controller.js';
const router = express.Router();


router.post("/signup",signup);

router.get("/login",(req,res) => {
    res.send("Login Endpoint");
})

router.get("/update",(req,res) => {
    res.send("logout Endpoint");
})



export default router;