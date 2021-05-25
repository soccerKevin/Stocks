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

const cryptoHash = {}

export const CRYPTO_SYMBOLS = CRYPTOS.map((crypto) => {
  cryptoHash[crypto.symbol] = crypto
  return crypto.symbol
})

export const CRYPTO_HASH = cryptoHash
