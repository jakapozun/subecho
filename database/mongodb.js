import mongoose from "mongoose";
import {DB_URI} from "../config/env.js";

if (!DB_URI){
    throw  new Error("DB_URI is not defined");
}

export const connectToDb = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log("Connected to database");
    } catch (e){
        console.log("Error connecting to database", e);
        process.exit(1);
    }
}