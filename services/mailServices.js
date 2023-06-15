const nodemailer = require("nodemailer");
require("dotenv").config()

var transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
})

var mailOptions = {
    from: process.env.EMAIL,
    to: "pateriyaaashish255@gmail.com",
    subject: "Hello",
    text: "text for message testing",


};

module.exports = { transpoter, mailOptions }