var nodemailer = require('nodemailer');
const secure = require("./secure.js");
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: secure.gmail
});

export default function sendMail(mailOptions){
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
