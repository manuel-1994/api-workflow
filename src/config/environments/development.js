module.exports = {
  port: process.env.PORT,
  db:{
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DATABASE
  },
  jwt_secret: process.env.JWT_SECRET,
  callback_url: process.env.CALLBACK_URL,
  oauth_client_id: process.env.OAUTH_CLIENT_ID,
  oauth_client_secret: process.env.OAUTH_CLIENT_SECRET
}