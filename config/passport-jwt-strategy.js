const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.SECRET}`,
};
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
        let user=await  User.findById(jwt_payload._id).select('-password')
    //   if (err) {
    //     return done(err, false);
    //   }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
  })
);

module.exports = passport;
