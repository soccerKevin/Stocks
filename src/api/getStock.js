import Debug from 'debug'
import { getStocks } from './'
import axios from 'axios'

// get a stock from any api in the arsenal
export const getStock = (api, options) => {
  const debug = Debug(`stocks:api:${api}`)

  // handlers for the api
  const { getOptions, status200Errors, normalize } = getStocks[api]

  // get customized options for api endpoint
  const routeOptions = getOptions ? getOptions(options) : options

  debug(`Fetching from ${api}: `, routeOptions)

  return axios({ ...routeOptions, method: 'get' })
  .then((response) => {
    // some api's return status 200 with errors
    if (status200Errors) status200Errors(response)

    // each api has it's own data object structure
    if (normalize) return normalize(response.data)
    return response.data
  })
}
