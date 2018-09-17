var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


//Routes begin

var index = require('./routes');
//var about = require('./routes/about');
var api = require('./routes/api');
var mailer = require('./routes/mailer');
var logger = require('./middleware/logger');
var jwtroute = require('./routes/jwttest');


app.use('./', index);
//app.use('./about', about);
app.use('./api', api);
app.use('./mailer', mailer);
app.use('./jwt', jwtroute);


//route end


// view is directory for all template files 

//Error Page Routing 

app.use(function(request, response, next) {
    var URL = request.protocol + '://' + request.get('host') + request.originalUrl;
    var err = new Error('Page Not Found');
    err.status = 404;
    logger.error('Page Not Found. URL : ' + URL + '\n' + err);
    next();
});
module.exports = app;