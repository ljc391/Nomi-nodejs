var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikesSchema = new Schema({
    user: { type:Schema.Types.ObjectId, ref:"User" },
    content: { type:Schema.Types.ObjectId, ref:"Content" }

},{ collection:'Likes'});


module.exports = mongoose.model('Likes', LikesSchema);