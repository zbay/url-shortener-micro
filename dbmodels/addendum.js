var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AddendumSchema = new Schema({"addendumToken": String});
  
mongoose.model('Addendum', AddendumSchema);