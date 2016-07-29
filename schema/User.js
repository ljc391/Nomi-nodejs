
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    u_accountName:{ type: String, required:true, unique:true },
    u_pwd:{ type: String },
    u_name:{ type: String, default:''},
    u_email:{ type: String, default:''},
    u_date:{ type: Date, default:Date.now },
},{ collection:'User'});

UserSchema.statics.register = function(userData, callback) {

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            callback(err);
        }else{
            bcrypt.hash(userData.u_pwd, salt, function (err, hash) {
                if (err) {
                    callback(err);
                }else{
                    userData.u_pwd = hash;

                    var user = new Model(userData);

                    user.save(function(error, _user) {
                        if (error){
                            if (callback) callback(error)
                        }else{
                            if (callback) callback(null,_user)
                        }
                    });

                }
            });
        }
    });

};

UserSchema.statics.authenticate = function(username, password, callback) {
    Model.findOne({ $or:[{u_accountName: username},{u_email: username}] }, function(err, user) {

        if (err) {
            callback(err);
        } else  if (!user) {
            callback(null);
        }else{

            bcrypt.compare(password, user.u_pwd, function(err, isMatch) {

                if (err){
                    console.log(err);
                    callback(err);
                } else if (!isMatch) {
                    console.log('no match');
                    callback(new Error('no match'));
                }else{
                    console.log('ismatch');
                    callback(null, user);
                }

            });
        }
    })
};

UserSchema.statics.update_ = function(id, fields){
    Model.findOne({ _id : id }).exec(function (error, one) {
        if (error){
            callback(error);
        }else{
            one.update(fields, callback);
        }
    });
}

var Model = mongoose.model('User', UserSchema);


module.exports = Model;