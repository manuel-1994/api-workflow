const { oauth_client_id, oauth_client_secret, callback_url } = require('../config/environments')

const GoogleStrategy = require('passport-google-oauth20').Strategy

const useGoogleStrategy = ()=>{
  return new GoogleStrategy({
      clientID:oauth_client_id,
      clientSecret:oauth_client_secret,
      callbackURL:"/api/auth/google/callback"
  },(accessToken,refreshToken,profile,done)=>{
      //console.log({accessToken,refreshToken,profile})
      done(null,{profile})
  })
}

module.exports = {
  useGoogleStrategy
}
