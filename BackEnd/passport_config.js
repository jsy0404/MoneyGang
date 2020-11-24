const passportconfig = require("passport");
const GoogleStrategy  = require("passport-google-oauth20").Strategy;
const googleData      = require("./google");
const ID              = googleData.web.client_id;
const Secret          = googleData.web.client_secret;
const callback        = googleData.web.redirect_uris[0];


passportconfig.serializeUser(function (user, done){
    done(null, user);
});
passportconfig.deserializeUser(function (user, done){
    done(null, user);
});

passportconfig.use(new GoogleStrategy({
        clientID     : ID,
        clientSecret : Secret,
        callbackURL  : callback
    },
    function (accessToken, refreshToken, profile, done){
        // use the profile info to check
        // if the user is registered in my DB.
        /*
        User.findorCreat({googleId: profile.id},
        function (err, user){
            return done(err, user);
        });
        */
        return done(null, profile);
    }
));
