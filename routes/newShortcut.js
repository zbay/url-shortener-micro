var Poll = require("../dbmodels/poll.js");
module.exports = function(app){
    app.get("/new/:longURL", function(req, res){
        var longURL = req.params.longURL;
        var urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
        if(longURL.match(urlRegex)){
            
             res.send(JSON.stringify({"original_url":longURL, "short_url": shortify(longURL)}));
        }
        else{
            res.send(JSON.stringify({"error":"URL invalid"}));
        }
    });
    function shortify(longURL){
        
    }
}
