var nodemailer = require('nodemailer');
var express = require('express');
var mongoose = require('mongoose');

var database = require('../middleware/database');

var router = express.Router();

var to = 'sandeep.kuri.ca@gmail.com';

var Schema = mongoose.Schema;

var emailschema = new Schema({
    name: String,
    from: String,
    subject: String,
    message: String
});
var Email = database.model('Email', emailschema);

var transporter = nodemailer.createTransport("SMTP", {
    service: "Mailgun",
    auth: {
        user: process.env.MAILGUN_SMTP_LOGIN,
        pass: process.env.MAILGUN_SMTP_PASSWORD
    }
});

router.post('/send', function(req, res, next) {

    var mailInfoReceiver = {
        name: req.body.name,
        from: req.body.from,
        subject: req.body.subject,
        message: req.body.message
    };

    var maildatabase = new Email({
        name: mailInfoReceiver.name,
        from: mailInfoReceiver.from,
        subject: mailInfoReceiver.subject,
        message: mailInfoReceiver.message
    });

    console.log("Mailer Object" + maildatabase);

    transporter.sendMail(mailInfoReceiver, function(error, response) {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            console.log("Message send: " + response.message);
            res.send("send");

        }

    });

    mail.save(function(err, mailObj) {

        if (err) {
            console.log(err);

        } else {
            console.log('Saved successfully: ', mailObj);
        }
    });
});
module.exports = router;