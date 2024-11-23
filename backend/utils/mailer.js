const nodemailer = require('nodemailer');

// Mailtrap transporter configuration
// const transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io", // Replace with your Mailtrap SMTP server
//     port: 2525, // Default Mailtrap port
//     auth: {
//         user: process.env.MAILTRAP_USER, // Mailtrap username
//         pass: process.env.MAILTRAP_PASS, // Mailtrap password
//     },
// });

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f1fa24516e6ad1",
      pass: "0efdfde8a9358e"
    }
  });

module.exports = transporter;