'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;
var express = require('express');
var app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var newShortcut = require('./routes/newShortcut.js');
var savedShortcut = require('./routes/savedShortcut.js');
mongoose.connect('mongodb://heroku_bdpzl0fg:lvaq24pju65pel7t952fdpuvgk@ds047085.mongolab.com:47085/heroku_bdpzl0fg', function (err, db)
//mongoose.connect('mongodb://localhost:27017/url-shortener-micro', function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('./public'));
    
var port = process.env.PORT || 8080;
    
routes(app);
newShortcut(app);
savedShortcut(app);

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});
}
});