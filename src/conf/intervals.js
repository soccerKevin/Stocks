export const INTERVALS_HASH = {
  '1min':  { label: '1min',  alpha: '1min', yahoo: '1min', finnhub: '1' },
  '5min':  { label: '5min',  alpha: '5min', yahoo: '5min', finnhub: '5' },
  '15min': { label: '15min', alpha: '15min', yahoo: '15min', finnhub: '15' },
  '60min': { label: '60min', alpha: '60min', yahoo: '60min', finnhub: '60' },
  '1day':  { label: '60min', alpha: '60min', yahoo: '1d', finnhub: '60' },
}

export const INTERVALS = Object.keys(INTERVALS_HASH)
