var Pair = require("../dbmodels/pairs.js");
var dotenv = require('dotenv').load();
module.exports = function(app){
    app.get("/new/:longURL", function(req, res){
        var longURL = req.params.longURL;
        var shortURL = shortify(longURL);
        var urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
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
    function shortify(longURL){
        var addOn = process.env.CURRENT_APPENDUM;
        incrementAppendum(addOn);
        var baseURL = process.cwd().slice(process.cwd().indexOf("/new/") +1);
        return baseURL + addOn;
    }
    function incrementAppendum(addOn) {
        var newAddOn = addOn.split('');
        var i = newAddOn.length-1;
        var characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
        var lastCharacter = newAddOn[newAddOn.length-1];
        if(lastCharacter == '9'){
            while(newAddOn[i]=='9'){
                if(i==0){
                    newAddOn.shift("a");
                }
                else{
                newAddOn[i] = 'a';
                }
                 i--;
            }
        }
        else{
             var currentIndex = characters.indexOf(newAddOn[i]);
             newAddOn[i] = characters.charAt(currentIndex+1);
        }
       
        process.env.CURRENT_APPENDUM = newAddOn.join("");
    }
}
