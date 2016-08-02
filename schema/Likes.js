var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikesSchema = new Schema({
    user: { type:Schema.Types.ObjectId, ref:"User" },
    content: { type:Schema.Types.ObjectId, ref:"Content" }

},{ collection:'Likes'});


LikesSchema.statics.findlikes = function(user,content,callback) {
    Model.findOne({user: user}, function(err, Likes) {
          callback(null, Likes);

});
};


LikesSchema.statics.likescontent = function(likesData, callback){

           // if (callback) callback(null,likesDate);
     ///      if(!likesData){
        //        if (callback) callback("error");
          // }else{
            //    if (callback) callback(null,likesData)
          // }
    var likes = new Model(likesData);

    likes.save(function(error, likes) {
        if (error){
            if (callback) callback(error)
        }else{
            if (callback) callback(null,likes)
        }
    });


}


var Model = mongoose.model('Likes', LikesSchema);


module.exports = Model;