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
    apiKey:  process.env.YAHOO_API_KEY,
    apiHost: process.env.YAHOO_API_HOST,
  },
  finnhub: {
    apiKey:        process.env.FINNHUB_API_KEY,
    sandboxApiKey: process.env.FINNHUB_SANDBOX_API_KEY,
    webhookSecret: process.env.FINNHUB_WEBHOOK_SECRET,
  },
  polygon: {
    apiKey: process.env.POLYGON_API_KEY,
  }
}

export default config
