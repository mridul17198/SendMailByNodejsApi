const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const fs=require('fs')
const Keys=require('./keys');

// This is used by session to serialize data to be send to the cookie
passport.serializeUser(function(profile, done) {
    done(null, profile);
  });
passport.deserializeUser(function(profile, done) {
      done(null,profile);
});

// This is passport strategy for Google Oauth2.0
passport.use(new GoogleStrategy({
    
    //options for the google strat
    callbackURL:'auth/redirect',
    clientID:Keys.clientId,
    clientSecret:Keys.clientSecret
},(accessToken,refreshToken,profile,done)=>{             // This is callback which is used to check whether is present or not
    Keys.refreshToken=refreshToken;
    Keys.user=profile.emails[0].value;
    Keys.accessToken=accessToken
    done(null,profile)
})
);