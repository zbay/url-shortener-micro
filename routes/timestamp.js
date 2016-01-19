var moment = require('moment');
module.exports = function(app){
    app.get("/:timestamp", function(req, res){
        var isUnix = false;
        var isNatLang = false;
        var isDashedNumber = false;
        var dateRegex1 = /(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d\d?)(th|,\s)(\d\d\d\d)/;
        var dateRegex2 = /(\d\d\d\d)-(\d\d)-(\d\d)/;
        var timestampQuery = req.params.timestamp;
        if(timestampQuery == parseInt(timestampQuery, 10)){
            isUnix = true;
        }
        if(timestampQuery.match(dateRegex1)){
           isNatLang = true; 
        }
        if(timestampQuery.match(dateRegex2)){
           isDashedNumber = true; 
        }
        if(!isUnix && !isNatLang && !isDashedNumber){
            res.send(JSON.stringify({"unix": null, "natural": null}));
        }
        else if(isNatLang){
            res.send(JSON.stringify({"unix": convertToUnix(timestampQuery, true), "natural": timestampQuery}));
        }
        else if(isDashedNumber){
            res.send(JSON.stringify({"unix": convertToUnix(timestampQuery, false), "natural": convertToNatural(timestampQuery, false)}));
        }
        else{ //isUnix
            res.send(JSON.stringify({"unix": timestampQuery, "natural": convertToNatural(timestampQuery, true)}));
        }
    });
    function convertToUnix(dateString, isNatural){
        if(isNatural){
            return moment(dateString, "MMMM D, YYYY").format("X");
        }
        else{
            return moment(dateString, "YYYY-MM-DD").format("X");
        }
    }
    function convertToNatural(dateString, isUnix){
        if(isUnix){
         return moment.unix(dateString).format("MMMM D, YYYY");   
        }
        else{
            return moment(dateString).format("MMMM D, YYYY");
        }
    }
}
