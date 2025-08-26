import mongoose from "mongoose";
import {User} from "../models/user.model.js";
import * as bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            const error = new Error("User already exists with this email");
            error.status = 409;
            throw error;
        }

        // Hash the password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const newUsers = await User.create([
            {
                name, email, password: hashedPassword
            }
        ], {session});

        const token = await jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({success: true, message: "User created successfully", token, user: newUsers[0]});
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {

        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            const error = new Error("User not found with this email");
            error.status = 404;
            throw error;
        }

        const isPasswordValid = await bycrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.status = 401;
            throw error;
        }

        const token = await jwt.sign({userId: existingUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({success: true, message: "User signed in successfully", token, user: {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
            }});
    } catch (error) {
        next(error);
    }

}

export const signOut = async (req, res, next) => {
//
}