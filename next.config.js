require('dotenv').config();

module.exports = {
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    GOOGLE_BOOKS_KEY: process.env.GOOGLE_BOOKS_KEY
  },
};