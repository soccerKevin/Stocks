export const RANGES_HASH = {
  '1day':   { label: '1 day',   yahoo: '1d'  },
  '5day':   { label: '5 day',   yahoo: '5d'  },
  '1month': { label: '1 month', yahoo: '1mo' },
  '3month': { label: '3 month', yahoo: '3mo' },
  '6month': { label: '6 month', yahoo: '6mo' },
  '1year':  { label: '1 year',  yahoo: '1y'  },
  '2year':  { label: '2 year',  yahoo: '2y'  },
  '5year':  { label: '5 year',  yahoo: '5y'  },
  '10year': { label: '10 year', yahoo: '10y' },
  'ytd':    { label: 'ytd',     yahoo: 'ytd' },
  'max':    { label: 'max',     yahoo: 'max' },
}

export const RANGES = Object.keys(RANGES_HASH)
