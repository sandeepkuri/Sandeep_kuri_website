var winston = require('winston');
const fs = require('fs');

winston.emitErrs = true;
const logDir = 'log'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

var logger =  new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: logDir+ '/logs.log',
            handleExceptions: true,
            timestamp: tsFormat,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true 
            
        }),
        new winston.transports.Console({
              level: 'debug',
            handleExceptions: true,
            timestamp: tsFormat,
            json: false,
            colorize: true
        })
    ], 
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};