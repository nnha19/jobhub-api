const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  secure: false,
  service: "gmail",
});

module.exports = transporter;
