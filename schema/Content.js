var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    c_title:{ type: String, default:''},
    c_text:{ type: String, default:''},
    c_img:{ type: String, default:''},
    user: { type:Schema.Types.ObjectId, ref:"User" },
    c_date:{ type: Date, default:Date.now }
},{ collection:'Content'});

ContentSchema.statics.postContext = function(contentData, callback) {
    var content = new Model(contentData);

    content.save(function(error, content) {
        if (error){
            if (callback) callback(error)
        }else{
            if (callback) callback(null,content)
        }
    });


};

ContentSchema.statics.loadContent = function(contentData, callback) {

    Model.find({}).exec(function (error, content) {
        if (error){
            if (callback) callback(error)
        }else{
            if (callback) callback(null,content)
        }
    });


};

var Model = mongoose.model('Content', ContentSchema);


module.exports = Model;