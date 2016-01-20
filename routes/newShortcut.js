var mongoose = require('mongoose');
var Pair = require(process.cwd() + "/dbmodels/pairs.js");
Pair = mongoose.model("Pair");
var dotenv = require('dotenv').load();
var rootURL = "https://url-shortener-micro-zbay.c9users.io/";
module.exports = function(app){
    app.get("/new/*", function(req, res){
        var longURL = req.url.slice(req.url.indexOf("/new/")+5);
        var shortURL = shortify();
        var urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
        if(longURL.match(urlRegex)){
            console.log(shortURL);
               var newPair = new Pair({"original_url": longURL, "short_url":shortURL}); 
                newPair.save(function(err, message){
                    res.send(JSON.stringify({"original_url":longURL, "short_url": shortURL}));
                });
        }
        else{
            res.send(JSON.stringify({"error":"URL invalid"}));
        }
    });
    function shortify(){
        var addOn = "" + process.env.CURRENT_APPENDUM;
        incrementAppendum(addOn);
        return rootURL + addOn;
    }
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
        }
       
        process.env.CURRENT_APPENDUM = newAddOn.join("");
    }
}
