import { generateToken } from '../lib/utils.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const {fullName,email,password} = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be of 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email address"});
        }
        
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email is already registered"});


        //123456 -> $dnjasdkasj_?dmsakmk
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })
        
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            //200 -> means success
            res.status(201).json({ // 201 -> something is created
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

            //TOdo: send welcome email to user
        }else{
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}
