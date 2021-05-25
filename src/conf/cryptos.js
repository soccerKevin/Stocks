export const CRYPTOS = [
  {
    symbol: 'BSV',
    name:   'Bitcoin SV',
    type:   'crypto',
  },
  {
    symbol: 'BCH',
    name:   'Bitcoin Cash',
    type:   'crypto',
  },
  {
    symbol: 'BTC',
    name:   'Bitcoin',
    type:   'crypto',
  },
  {
    symbol: 'ETC',
    name:   'Ethereum Classic',
    type:   'crypto',
  },
  {
    symbol: 'ETH',
    name:   'Ethereum',
    type:   'crypto',
  },
  {
    symbol: 'DOGE',
    name:   'Dogecoin',
    type:   'crypto',
  },
  {
    symbol: 'LTC',
    name:   'Litecoin',
    type:   'crypto',
  },
]

export const SYMBOLS_OBJ = {}

export const SYMBOLS = CRYPTOS.map((crypto) => {
  SYMBOLS_OBJ[crypto.symbol] = crypto.symbol
  return crypto.symbol
})

export const CRYPTO_HASH = CRYPTOS.reduce((acc, crypto) => ({ ...acc, [crypto.symbol]: crypto.name }), {})
