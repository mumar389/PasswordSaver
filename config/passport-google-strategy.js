const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        "http://localhost:7890/user/auth/google/google-home",
    },
   async function (accessToken, refreshToken, profile, cb) {
      const user=await User.findOne({ email: profile.emails[0].value })
        // if (err) {
        //   console.log("Error in passport-google");
        //   return cb(err);
        // }
        if (!user) {
         let users=await User.create(
            {
              email: profile.emails[0].value,
              name: profile.displayName,
              password: profile.id,
            },
          )
            //   if (!users) {
            //     console.log("Error in passport-google");
            //     return cb(err);
            //   }
            //   console.log("Google Successfully created user");
              return cb(null, users);
            // }
        } else {
          // console.log(user);
          // console.log("User already exists");
          return cb(null, user);
        }
      }
))

module.exports = passport;
