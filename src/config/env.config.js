const dotenv = require('dotenv');

dotenv.config({
    path:'./.env.production'
});



module.exports = {
PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  SESSION_KEY: process.env.SESSION_KEY,
  SECRET_KEY: process.env.SECRET_KEY
}