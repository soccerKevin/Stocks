import { COMPANIES, COMPANY_SYMBOLS, COMPANY_HASH } from './companies'
import { CRYPTOS, CRYPTO_SYMBOLS, CRYPTO_HASH  } from './cryptos'

export const TICKERS = COMPANIES.concat(CRYPTOS)

export const SYMBOLS = COMPANY_SYMBOLS.concat(CRYPTO_SYMBOLS)

// losing a couple of company tickers, cryptos are overriding them
export const TICKERS_HASH = { ...COMPANY_HASH, ...CRYPTO_HASH }

export const getTicker = (symbol) => TICKERS_HASH[symbol]
