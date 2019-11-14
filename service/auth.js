const express = require('express');
const router = express.Router();

// for accessing env variable 
const config = require('config');

// passport for social login
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// middleware for facebook login auth
passport.use(new FacebookStrategy({
    clientID: config.get('facebook_client_id'),
    clientSecret: config.get('facebook_secret_key'),
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            console.log("=============>", err, user)
            return cb(err, user);
        });
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    function (req, res) {
        res.send("done")
    });

module.exports = router;
