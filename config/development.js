require('dotenv').config()

const config = {
  "server": {
    "port": 3000,
  },
  "alpha": {
    apikey: process.env.ALPHA_API_KEY,
  }
}

module.exports = config