const express=require('express');
const authRoutes=require('./routes/auth-routes');
const passport=require('passport');
const bodyParser=require('body-parser');
const passportSetUp=require('./config/passport-setup');
const cookieSession = require('cookie-session');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'profileSession',
    keys: ['key1', 'key2']
  }))
// This is used to enable cors because we are making cross-origin request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// This is used to initialize passport do to authenticate
app.use(passport.initialize());
app.use(passport.session());


//set up view engine
app.set('view engine','ejs');

//set up routes
app.use('/auth',authRoutes);

//create home route
app.get('/',(req,res)=>{
    res.render('home');
});
app.listen(3000, ()=>{
    console.log('app now listening for request on port 3000');
});