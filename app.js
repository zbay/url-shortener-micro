'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;
var express = require('express');
var app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var newShortcut = require('./routes/newShortcut.js');
//mongoose.connect('mongodb://heroku_l51d2vps:2aq0iso1kf2gjkv2b8tb1nm5g8@ds045475.mongolab.com:45475/heroku_l51d2vps', function (err, db)
mongoose.connect('mongodb://localhost:27017/url-shortener-micro', function (err, db)
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
//savedShortcut(app); //route to the saved pair URL. Also fix the env variable problem

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});
}
});