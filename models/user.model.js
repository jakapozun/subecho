import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"], minLength: 2, maxLength: 50},
    email: {type: String, required: [true, "Email is required"], unique : true},
    password: {type: String, required: [true, "Password is required"], minLength: 6},
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);