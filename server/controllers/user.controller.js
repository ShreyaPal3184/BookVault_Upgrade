import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role) {
            return res.status(401).json({
                message: "Missing entries",
                success: false
            })
        };

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message: "User already exists with this email",
                user,
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "User account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);        
    }
}


export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role) {
            return res.status(401).json({
                message: "Missing entries",
                success: false
            })
        };

        let user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                message: "User doesnot exist",
                success: false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        if(role != user.role) {
            return res.status(400).json({
                message: "Account doesnot exist with this role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, samSite: 'strict'}).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error);        
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "User logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);        
    }
}

