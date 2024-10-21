'use strict';

var server = require('server');

server.get('HelloWorld', function (req, res, next) {
    var myVariable = 'Hello World!';

    res.render('training/myfirsttemplate', {
        myVariable: myVariable
    });

    return next();
});

module.exports = server.exports();