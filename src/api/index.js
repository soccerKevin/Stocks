export { getStock } from './getStock'

import * as alphaGetStock from './alpha/getStock'
import * as yahooGetStock from './yahoo/getStock'

export const getStocks = { alpha: alphaGetStock, yahoo: yahooGetStock }
