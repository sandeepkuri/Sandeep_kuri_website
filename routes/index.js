var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
    response.render('pages/comingsoonhtml');

});

module.exports = router;