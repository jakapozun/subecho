import dayjs from "dayjs";
import {generateEmailTemplate} from "./email-template.js";
import {ACCOUNT_EMAIL, transporter} from "../config/nodemailer.js";

export const sendReminderEmail = async ({to, type, subscription}) => {
    if (!to || !type) throw new Error('Missing required parameters');

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.price} ${subscription.currency} - ${subscription.frequency}`,
        paymentMethod: subscription.paymentMethod
    }

    const message = generateEmailTemplate(mailInfo);
    const subject = `Reminder: ${type}`;

    const mailOptions = {
        from: ACCOUNT_EMAIL,
        to,
        subject,
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}