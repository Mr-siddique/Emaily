const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { googleClientID, googleClientSecret, facebookClientID, facebookClientSecret } = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById({ _id });
        done(null, user);
    } catch (err) {
        console.log(err.message);
    }
})

passport.use(new googleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
        done(null, existingUser);
    }
    else {
        const user = new User({ googleId: profile.id });
        await user.save();
        done(null, user);
    }
}));
passport.use(new FacebookStrategy({
    clientID: facebookClientID,
    clientSecret: facebookClientSecret,
    callbackURL: "/auth/facebook/callback"
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const existingUser = await User.findOne({facebookId: profile.id });
        if (existingUser) {
            cb(null, existingUser);
        } else {
            const user = new User({ facebookId: profile.id });
            await user.save();
            console.log(user);
            cb(null, user);
        }

    } catch (err) {
        console.log(err.message);
    }
    // console.log('hey');
    // User.findOne({ facebookId: profile.id }, function (err, user) {
    //     console.log(user)
    //   return cb(err, user);
    // });
}));