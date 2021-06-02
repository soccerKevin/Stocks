export const CRYPTOS = [
  {
    symbol:        'BSV',
    binanceSymbol: 'BSVUSD',
    yahoo:         'BSV-USD',
    name:          'Bitcoin SV',
    type:          'crypto',
  },
  {
    symbol:        'BCH',
    binanceSymbol: 'BCHUSD',
    yahoo:         'BCH-USD',
    name:          'Bitcoin Cash',
    type:          'crypto',
  },
  {
    symbol:        'BTCT',
    binanceSymbol: 'BTCUSDT',
    yahoo:         'BTC-USD',
    name:          'Bitcoin',
    type:          'crypto',
  },
  {
    symbol:        'ETC',
    binanceSymbol: 'ETCUSD',
    yahoo:         'ETC-USD',
    name:          'Ethereum Classic',
    type:          'crypto',
  },
  {
    symbol:        'ETHT',
    binanceSymbol: 'ETHUSDT',
    yahoo:         'ETH-USD',
    name:          'Ethereum',
    type:          'crypto',
  },
  {
    symbol:        'DOGE',
    binanceSymbol: 'DOGEUSD',
    yahoo:         'DOGE-USD',
    name:          'Dogecoin',
    type:          'crypto',
  },
  {
    symbol:        'LTC',
    binanceSymbol: 'LTCUSD',
    yahoo:         'LTC-USD',
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

export const BINANCE_SYMBOLS = CRYPTOS.map((crypto) => crypto.binanceSymbol)


