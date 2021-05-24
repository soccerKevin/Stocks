import dotenv from 'dotenv'
dotenv.config()

const config = {
  server: {
    port: 3000,
  },
  alpha: {
    apikey: process.env.ALPHA_API_KEY,
  },
  yahoo: {
    apiKey: process.env.YAHOO_API_KEY,
    apiHost: process.env.YAHOO_API_HOST,
  }
}

export default config
