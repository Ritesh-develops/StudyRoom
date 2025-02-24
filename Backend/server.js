import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db.js';
import User from './models/User.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin :  "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//signup
app.post('/api/signup', async (req, res)=>{
    const {username, email, password} = req.body;   
    try {
        if(!username || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({message: "User already exists"});
        }

        const usernameExists = await User.findOne({username});
        if(usernameExists){
            return res.status(400).json({message: "User already exists"});
        }

        //hashing password;
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword
        });

        //jwt token
        if(userDoc){
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
            res.cookie('token', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict',
               maxAge: 7*24*60*60*1000, 
                expiresIn: '1d'});
        }

        return res.status(200).json({user:userDoc, message: "User created successfully"});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//login
app.post('/api/login', async (req, res)=>{
    const {email, password} = req.body;
    try {
        const userDoc = await User.findOne({email});
        if(!userDoc){
            return res.status(400).json({message: "User not registered"});
        }
        const isPasswordValid = await bcrypt.compareSync(password, userDoc.password);

        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid Password"});
        }
        //jwt token
        const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000, 
            expiresIn: '1d'});

         res.status(200).json({user:userDoc, message: "User logged in successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})


// fetch user
app.get("/api/fetch-user", async (req, res)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message: "User not authenticated"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userDoc = await User.findOne({_id: decoded.id}).select("-password");
        if(!userDoc){
            return res.status(400).json({message: "User not found"});
        }
        res.status(200).json({user: userDoc});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//logout
app.post('/api/logout', async (req, res)=>{
    res.clearCookie('token');
    res.status(200).json({message: "User logged out successfully"});
})

app.listen(PORT, async ()=>{
    await connectDB();
    console.log("server is running on port", PORT);
})