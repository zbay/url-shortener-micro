module.exports = function(app){

var mongoose = require('mongoose');
var mongo = require('mongodb');
var Pair = require(process.cwd() + "/dbmodels/pairs.js");
Pair = mongoose.model("Pair");
var Addendum = require(process.cwd() + "/dbmodels/addendum.js");
Addendum = mongoose.model("Addendum");
//var rootURL = "https://url-shortener-micro-zbay.c9users.io/tiny/";
var rootURL = "https://url-shortener-micro.herokuapp.com/tiny/";
var urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
Addendum.findOne({}, function(err, doc){
    if(!doc){
        var newAddendum = new Addendum({"addendumToken": "a"});
        newAddendum.save();
        Pair.remove({});
    }
});

    app.get("/new/*", function(req, res){
        var longURL = req.url.slice(req.url.indexOf("/new/")+5);
        console.log(longURL);
        Addendum.findOne({}, function(err, data){
        var shortURL = data.addendumToken;
        if(longURL.match(urlRegex)){
            Pair.findOne({"original_url": longURL}, function(err, doc){
  
                if(doc){
                    res.send(JSON.stringify({"original_url":longURL, "short_url": rootURL + doc.short_url}));
                }
                else{
                    incrementAppendum(data.addendumToken);
                    var newPair = new Pair({"original_url": longURL, "short_url":shortURL}); 
                    newPair.save(function(err, message){
                    res.send(JSON.stringify({"original_url":longURL, "short_url": rootURL + shortURL}));
                });
                }
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
             var currentIndex = characters.indexOf(newAddOn[i]);
             newAddOn[i] = characters[currentIndex+1];
             console.log(newAddOn);
        }
        Addendum.update({$set: {"addendumToken": newAddOn.join("")}}, function(err, data){
            console.log(err);
            console.log(data);
        });
    }
}
