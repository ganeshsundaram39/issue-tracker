var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
var GitHubStrategy = require("passport-github2").Strategy
var TwitterStrategy = require("passport-twitter").Strategy
var FacebookStrategy = require("passport-facebook").Strategy

var trustProxy = false
if (process.env.DYNO) {
  // Apps on heroku are behind a trusted proxy
  trustProxy = true
}
module.exports = function (passport) {
  let baseUrl = `${process.env.API_VERSION}/user`

  passport.serializeUser((data, cb) => {
    cb(null, data)
  })

  passport.deserializeUser((data, cb) => {
    cb(null, data)
  })
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${baseUrl}/login/google/callback`,
        proxy: trustProxy,
      },
      function (token, tokenSecret, profile, done) {
        console.log({ token, tokenSecret, profile })
        return done(null, profile)
      }
    )
  )
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${baseUrl}/login/github/callback`,
        proxy: trustProxy,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log({ accessToken, refreshToken, profile })
        return done(null, profile)
      }
    )
  )

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: `${baseUrl}/login/twitter/callback`,
        proxy: trustProxy,
        includeEmail: true,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log({ accessToken, refreshToken, profile })
        return done(null, profile)
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${baseUrl}/login/facebook/callback`,
        profileFields: ["id", "displayName", "photos", "email"],

        passReqToCallback: true,
        proxy: trustProxy,
      },
      function (req, accessToken, refreshToken, profile, done) {
        console.log({ accessToken, refreshToken, profile })
        return done(null, profile)
      }
    )
  )
}
