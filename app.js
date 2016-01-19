'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var timestamp = require('./routes/timestamp.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('./public'));
    
var port = process.env.PORT || 8080;
    
routes(app);
timestamp(app);

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});