var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json()); //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//------------------------Database Connection------------------//

var uristring = 'mongodb://demouser:123abc@ds161446.mlab.com:61446/sandeep_kuri_website';

mongoose.connect(uristring, function (err, res) {

    if (err) {
        console.log('ERROR connecting to:' + uristring + '--' + err);

    } else {
        console.log('Succesfully connected to:' + uristring);
    }
});

//-------------------------Database Schema---------------------//

var Schema = mongoose.Schema;

var emailschema = new Schema({
    email: String
});

var Email = mongoose.model('Email', emailschema);


//-------------------------Route & mailer----------------------//

var myemail = 'sandeep.kuri.ca@gmail.com'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: 'sandeep.kuri.ca@gmail.com', // Your email id
        pass: 'mahla001' // Your password
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
        subject: 'Welcome to Myworld',
        html: '<h1>Thank you</h1>'
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


//------------------------Error Page Routing------------------//

app.use(function (request, response, next) {
    var URL = request.protocol + '://' + request.get('host') + request.originalUrl;
    var err = new Error('Page Not Found');
    err.status = 404;
    console.log('Page Not Found. URL : ' + URL + '\n' + err)
    next();
})

//------------------------Connection-------------------------//

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
