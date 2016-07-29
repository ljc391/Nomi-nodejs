var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    c_title:{ type: String, default:''},
    c_text:{ type: String, default:''},
    c_img:{ type: String, default:''}
},{ collection:'Content'});


module.exports = mongoose.model('Content', ContentSchema);