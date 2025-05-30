import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/",async(req,res)=>{
    const {email,password}=req.body;

    if (!email || !password)
        return res.status(400).json({ error: "Email and Password required" });
    try{
        const user = await User.findOne({email:email});
        if (!user)
            return res.status(401).json({ error: "Invalid email or password" });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user._id, username: user.name }, JWT_SECRET, {
        expiresIn: "7d",
        });
        res.json({_id:user._id, token, username: user.name });
    }
    catch(error){
        res.status(500).json({ error: "Server error" });
    }
    
})

export default router;