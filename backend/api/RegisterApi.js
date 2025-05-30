import express from "express"
const router = express.Router();
import User from "../models/User.js"
import bcrypt from "bcryptjs"

router.post("/",async (req,res)=>{
    const {name,email,password}=req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: "All fields are required" });
    try{
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(409).json({ error: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser=await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({ message: "User registered successfully" });
    }catch (err) {
        res.status(500).json({ error: "Server error" });
    } 
     
})

export default router;
