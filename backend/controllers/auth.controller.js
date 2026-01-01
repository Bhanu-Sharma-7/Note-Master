import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ $or: [{ email }, { name }] });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // 1. 6-Digit OTP Generate karo
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000 // 10 mins validity
        });

        await newUser.save();

        // 2. Email bhejo
        try {
            await sendEmail({
                email: newUser.email,
                subject: 'Your Verification OTP',
                html: `<h1>OTP Verification</h1><p>Your OTP is: <b>${otp}</b>. It expires in 10 mins.</p>`
            });
            res.status(201).json({ message: "OTP sent to your email!" });
        } catch (err) {
            await User.findByIdAndDelete(newUser._id);
            return res.status(500).json({ message: "Email failed. Try again." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ 
            email, 
            otp, 
            otpExpires: { $gt: Date.now() } 
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Account verified! You can now login." });
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (!user.isVerified) return res.status(401).json({ message: "Please verify your email first" });

        generateToken(res, user._id);
        res.status(200).json({ _id: user._id, name: user.name, message: "Login success" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};