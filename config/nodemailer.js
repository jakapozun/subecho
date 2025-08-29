import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD} from "./env.js";

export const ACCOUNT_EMAIL = "jaka.pozun@gmail.com";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ACCOUNT_EMAIL,
        pass: EMAIL_PASSWORD
    }
});
