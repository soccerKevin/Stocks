export const CRYPTOS = [
  {
    symbol:        'BSV',
    binanceSymbol: 'BSVUSD',
    name:          'Bitcoin SV',
    type:          'crypto',
  },
  {
    symbol:        'BCH',
    binanceSymbol: 'BCHUSD',
    name:          'Bitcoin Cash',
    type:          'crypto',
  },
  {
    symbol:        'BTCT',
    binanceSymbol: 'BTCUSDT',
    name:          'Bitcoin',
    type:          'crypto',
  },
  {
    symbol:        'ETC',
    binanceSymbol: 'ETCUSD',
    name:          'Ethereum Classic',
    type:          'crypto',
  },
  {
    symbol:        'ETHT',
    binanceSymbol: 'ETHUSDT',
    name:          'Ethereum',
    type:          'crypto',
  },
  {
    symbol:        'DOGD',
    binanceSymbol: 'DOG/USD',
    name:          'Dogecoin',
    type:          'crypto',
  },
  {
    symbol:        'LTC',
    binanceSymbol: 'LTCUSD',
    name:          'Litecoin',
    type:          'crypto',
  },
]

const cryptoHash = {}

export const CRYPTO_SYMBOLS = CRYPTOS.map((crypto) => {
  cryptoHash[crypto.symbol] = crypto
  return crypto.symbol
})

export const CRYPTO_HASH = cryptoHash

