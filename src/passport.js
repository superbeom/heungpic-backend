require("dotenv").config();
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = (payload, done) => {};

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
