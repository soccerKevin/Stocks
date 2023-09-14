export const INTERVALS_HASH = {
  '1min':  { label: '1min',  alpha: '1min', yahoo: '1min', finnhub: '1', polygon: '1/minute' },
  '5min':  { label: '5min',  alpha: '5min', yahoo: '5min', finnhub: '5', polygon: '5/minute' },
  '15min': { label: '15min', alpha: '15min', yahoo: '15min', finnhub: '15', polygon: '15/minute' },
  '60min': { label: '60min', alpha: '60min', yahoo: '60min', finnhub: '60', polygon: '60/minute' },
}

export const INTERVALS = Object.keys(INTERVALS_HASH)
