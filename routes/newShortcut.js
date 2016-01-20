module.exports = function(app){

var mongoose = require('mongoose');
var mongo = require('mongodb');
var Pair = require(process.cwd() + "/dbmodels/pairs.js");
Pair = mongoose.model("Pair");
var Addendum = require(process.cwd() + "/dbmodels/addendum.js");
Addendum = mongoose.model("Addendum");
var rootURL = "https://url-shortener-micro-zbay.c9users.io/tiny/";
var urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;

    app.get("/new/*", function(req, res){
        var longURL = req.url.slice(req.url.indexOf("/new/")+5);
        Addendum.findOne({}, function(err, data){
        incrementAppendum(data.addendumToken);
        var shortURL = data.addendumToken;
        if(longURL.match(urlRegex)){
               var newPair = new Pair({"original_url": longURL, "short_url":shortURL}); 
                newPair.save(function(err, message){
                    res.send(JSON.stringify({"original_url":longURL, "short_url": shortURL}));
                });
        }
        else{
            res.send(JSON.stringify({"error":"URL invalid"}));
        }
    });

    });
    function incrementAppendum(addOn) {
        var newAddOn = addOn.split('');
        var i = newAddOn.length-1;
        var characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
        var lastCharacter = newAddOn[newAddOn.length-1];
        if(lastCharacter == '9'){
            while(newAddOn[i]=='9'){
                newAddOn[i] = 'a';
                if(i==0){
                    newAddOn.unshift("a");
                }
                 i--;
            }
            if(i >= 0){
            var currentIndex = characters.indexOf(newAddOn[i]);
             newAddOn[i] = characters[currentIndex+1]; 
            }
        }
        else{
            console.log("in the right place: " + newAddOn);
             var currentIndex = characters.indexOf(newAddOn[i]);
             newAddOn[i] = characters[currentIndex+1];
        }
        Addendum.update({$set: {"addendumToken": newAddOn.join("")}});
    }
}
