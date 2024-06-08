// auth.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const User = require("./Models/userModel");
const Usage = require("./Models/usageModel");
const Billing = require('./Models/billingModel')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // find user with email
      const existing = await User.findOne({ email: profile.emails[0].value });

      // user not present save the user
      if (!existing) {
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          photoUrl: profile.photos[0].value,
        });

        const saved = await user.save();
        // console.log(saved);
        const usage = new Usage({
          userId: saved._id,
          matrix1: 0,
          matrix2: 0,
          matrix3: 0,
        });

        await usage.save();

        const start = new Date();
        const end = new Date(start);

        // Add one month to the end date
        end.setMonth(end.getMonth() + 1);

        const bill = new Billing({
          userId: saved._id,
          start: start,
          end: end,
          amount: 0,
        });

        await bill.save();
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
