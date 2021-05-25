import { COMPANIES } from './companies'
import { CRYPTOS } from './cryptos'

export const TICKERS = COMPANIES.concat(CRYPTOS)

export const SYMBOLS_OBJ = {}

export const SYMBOLS = TICKERS.map((ticker) => {
  SYMBOLS_OBJ[ticker.symbol] = ticker.symbol
  return ticker.symbol
})

export const TICKERS_HASH = TICKERS.reduce((acc, ticker) => ({ ...acc, [ticker.symbol]: ticker }), {})
