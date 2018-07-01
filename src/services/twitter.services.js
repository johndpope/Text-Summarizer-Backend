import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from '../modules/users/user.model';
import constants from '../config/constants';

const twitterOpts = {
  consumerKey: "EGLoBrQWNNtCDLYQKh6pupRO1",
  consumerSecret: "9FNzG4LlhCOhnNOf9VGS2SHQXAILjiLXTWfOrr9MT7W6nV05ww",
  callbackURL: "http://127.0.0.1:3000/api/v1/users/auth/twitter/callback",
};

const twitterStrategy = new TwitterStrategy(twitterOpts, async (accessToken, refreshToken, profile, done) => {
  try {
    return done(null, profile);
  } catch (err) {
    return done(err, false);
  }
});

passport.use(twitterStrategy);

export const authTwitter = passport.authenticate('twitter', { session: false });
export const authTwitterCallback = passport.authenticate('twitter', { session: false, failureRedirect: '/'})
