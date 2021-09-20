const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
// const {
//   googleClientID,
//   googleClientSecret,
//   facebookClientID,
//   facebookClientSecret,
// } = require("../config/keys");
const keys= require('../config/keys');
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById( _id );
    done(null, user);
  } catch (err) {
    console.log(err.message);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          facebookId: "",
          googleId: profile.id,
        });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = new User({ facebookId: "", googleId: profile.id });
          await user.save();
          done(null, user);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          facebookId: profile.id,
          googleId: "",
        });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = new User({ facebookId: profile.id, googleId: "" });
          await user.save();
          done(null, user);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
