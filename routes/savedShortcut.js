module.exports = function(app) {
var mongoose = require('mongoose');
var mongo = require('mongodb');
var Pair = require(process.cwd() + "/dbmodels/pairs.js");
Pair = mongoose.model("Pair");
  app.get("/tiny/*", function(req, res) {
      var short = req.url.slice(req.url.indexOf("/tiny/")+6);
      console.log(short);
      Pair.findOne({"short_url":short}, function(err, data){
          if(data){
              res.redirect(data.original_url);
          }
          else{
              res.json({"error":"not found"});
          }
      });
    });
};