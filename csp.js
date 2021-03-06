var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

app.use(bodyParser.json()); //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var index = require('./routes');
// app.use('/', index);

app.use("/public",express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/view/pages')))
/*----------------------------------------------------*/
/* Database Connection
------------------------------------------------------ */

var uristring = 'mongodb://demouser:123abc@ds161446.mlab.com:61446/sandeep_kuri_website';

mongoose.connect(uristring, function (err, res) {

    if (err) {
        console.log('ERROR connecting to:' + uristring + '--' + err);

    } else {
        console.log('Succesfully connected to:' + uristring);
    }
});

/*----------------------------------------------------*/
/* Database Schema
------------------------------------------------------ */

var Schema = mongoose.Schema;

var emailschema = new Schema({
    email: String
});

var Email = mongoose.model('Email', emailschema);


/*----------------------------------------------------*/
/* Route & Mailer
------------------------------------------------------ */

var myemail = 'sandeep.kuri.ca@gmail.com'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: 'sandeep.kuri.ca@gmail.com', // Your email id
        pass: '*******' // Your password
    }
});
//var transporter = nodemailer.createTransport("SMTP", {
//    service: "Mailgun",
//    auth: {
//        user: process.env.MAILGUN_SMTP_LOGIN,
//        pass: process.env.MAILGUN_SMTP_PASSWORD
//    }
//});

app.post('/subscribe', function (req, res, next) {
    var useremail = req.body.email;
    var mailInfoReceiver = {
        from: myemail,
        to: req.body.email,
        subject: 'Welcome to Sandeep.kuri.ca',
        html: '<p><h2>Thank you for Subscription!</h2></p><p>We will notifiy you as soon as the site is ready!!</p><p>Regards</p><p>Sandeep Kuri</p>'
    };
    var maildatabase = new Email({
        email: mailInfoReceiver.to

    });


    transporter.sendMail(mailInfoReceiver, function (error, response) {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            console.log("Message send to: " + useremail);
            res.send("send");

        }

    });

    maildatabase.save(function (err, mailObj) {

        if (err) {
            console.log(err);

        } else {
            console.log('Saved successfully in Database: ', mailObj);
        }
    });
});

/*----------------------------------------------------*/
/* Error Page Routing
------------------------------------------------------ */


app.use(function (request, response, next) {
    var URL = request.protocol + '://' + request.get('host') + request.originalUrl;
    var err = new Error('Page Not Found');
    err.status = 404;
    console.log('Page Not Found. URL : ' + URL + '\n' + err)
    next();
})

/*----------------------------------------------------*/
/* Connection
------------------------------------------------------ */


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
