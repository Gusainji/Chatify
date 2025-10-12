import jwt from 'jsonwebtoken';
import {ENV} from "./env.js"

export const generateToken = (userId,res) =>{

    const { JWT_SECRET } = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({userId},JWT_SECRET , {expiresIn:"7d"})

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, //7 days in milliseconds
        httpOnly:true, //prevent XSS attacks
        sameSite: "strict", //CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true //It is not secure-(http://localhost) -> production  & 
        // It is secure as http kai aage "s" hai-(https://dsmark.com) -> development

    })
    return token;
} 