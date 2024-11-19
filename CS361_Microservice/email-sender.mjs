import { text } from 'express';
import nodemailer from 'nodemailer';
// Code referenced from https://www.nodemailer.com/
// Nodemailer function that uses ethereal email as the sender,
// I used the tester email as the recipient also and the message appeared in the test email

const sendEmail = async (recipient, subject, body) => {
    // change transporter user and pass to your generated ethereal email
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'levi.wuckert@ethereal.email',
            pass: 'yfACa9W5MA7WKtWzTe'
        }
    });
    const mailOptions = {
        // Change the 'from' to be specific to your project
        from: 'MusicWorld <no-reply@musicworld.com>',
        to: recipient,
        subject: subject,
        text: body
    };
    try {
        // this all remains the same
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent!');
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
export {sendEmail};