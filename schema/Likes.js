var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikesSchema = new Schema({
    user: { type:Schema.Types.ObjectId, ref:"User" },
    content: { type:Schema.Types.ObjectId, ref:"Content" }

},{ collection:'Likes'});


UserSchema.statics.findlikes = function(user,content) {
    Model.findOne({ {user: user},{content: content}}, function(err, user) {

        if (err) {
            callback(err);
        } else  if (!user) {
            callback(null);
        }else{
                 if (!isMatch) {
                    console.log('no match');
                    callback(new Error('no match'));
                }else{
                    console.log('ismatch');
                    callback(null, user);
                }

        }
    })
};


var Model = mongoose.model('Likes', LikesSchema);


module.exports = Model;