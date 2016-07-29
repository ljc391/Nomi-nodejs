var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/nomi");
var connection = mongoose.connection;

var User = require('./schema/User');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'ShhhhSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000*24*14 },
    store: new MongoStore({ mongooseConnection: connection })
}));


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./public'));

app.use(function(req, res, next){
    if (req.session.user){
        req.user = req.session.user;
        res.locals.user = req.session.user;
        console.log('session user is: '+req.session.user.u_accountName);
    }else{
        res.user = null;
        res.locals.user = null;
        console.log('no session user');
    }
    next();
})

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/',function (req, res) {
   if (req.session.user) {
       res.render('home',{

       });
    }else{
        res.render('anonymous',{

       });
    }
})

app.post('/ajax/authenticate',function (req, res) {
   User.authenticate(req.body.u_accountName,req.body.u_pwd, function(error, user){
        if (error){
            res.json({success: false, error: error, message:'something went wrong'});
        }else if (!user){
            res.json({success: false, error: new Error('huh?'), message:'invalid username or password'});
        }else{
            req.session.user = user;
            res.json({success:true, user:user});
        }
    });
});

app.post('/ajax/register',function (req, res) {



    User.update_(1234, {
        u_name: 'mike'
    }, function(error, noa){

    })

   User.register({
        u_accountName:req.body.u_accountName,
        u_pwd:req.body.u_pwd,
        u_email:req.body.u_email,
        u_name:req.body.u_name
    }, function(error, user){
        if (error){
            res.json({success: false, error: error, message:'something went wrong'});
        }else{
            req.session.user = user;
            res.json({success:true, user:user});
        }
    });
});


app.post('/ajax/unauthenticate',function (req, res) {
   req.session.user = null;
   res.json({ success: true});
});


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})