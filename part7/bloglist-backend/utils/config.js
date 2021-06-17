require('dotenv').config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const SUPERUSER_TOKEN = process.env.SUPERUSER_TOKEN

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  SECRET,
  PORT,
  SUPERUSER_TOKEN
}