var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PairSchema = new Schema({"original_url": {type: String, unique: true}, "short_url": {type: String, unique: true}});
  
mongoose.model('Pair', PairSchema);