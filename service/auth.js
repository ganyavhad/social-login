const express = require('express');
const router = express.Router();
// for accessing env variable 
const config = require('config');

// passport for social login
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// app.use(passport.initialize());

// middleware for facebook login auth
passport.use(new FacebookStrategy({
    clientID: config.get('facebook_client_id'),
    clientSecret: config.get('facebook_secret_key'),
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'gender', 'photos', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

// Initialize passport into midleware
router.use(passport.initialize());

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // logged in member parse as req.user
        console.log("User =>", req.user)
        res.send(req.user)
    });

module.exports = router;
