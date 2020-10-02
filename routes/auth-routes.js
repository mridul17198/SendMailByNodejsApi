const router=require('express').Router();
const passport=require('passport');
const nodemailer=require('nodemailer');
const Keys=require('../config/keys');

//auth login
router.get('/login',passport.authenticate('google',{
    scope:['profile','email'],
    accessType: 'offline',
}));

//auth logout
router.get('/logout',(req,res)=>{
    //handle with passport
    res.send('loggingout')
});

// This will act as a middleware to check whether user is signedIn or Not
const isSignedIn=(req,res,next) =>{
    if(req.user)
    {
        next();
    }
    else{
        res.sendStatus(401);
    }
}

//This is Called When u are successfully authenticated by Oauth2.0
router.get('/good',isSignedIn,(req,res)=>{
    res.send("successfully Authenticated")
})

// This is Sending Email using Nodemailer
router.get('/sendMail',isSignedIn,function(req, res){

    var mailOptions = {
        from: req.user.emails[0].value,
        to: 'darkshadow26818@gmail.com',
        subject: 'My site contact from: ' + req.user.name,
        text: 'I am sending my mail through nodejs',
        html: 'Message from: ' + req.user.name + '<br></br> Email: ' +  req.user.emails[0].value + '<br></br> Message: ' + 'I am sending my mail through nodejs',
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: Keys,
    });
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
  })


//callback route for google to redirect to

router.get("/redirect",passport.authenticate('google',{failureRedirect:'/auth/login'}),(req,res)=>{
    res.redirect('/auth/good')
})

module.exports=router;