import Debug from 'debug'
import { getStatsFunction } from './'
import axios from 'axios'
import { stats as statsSchema } from './schema'

// get a stock from any api in the arsenal
export const getStats = async (api, options) => {
  const debug = Debug(`stocks:api:${api}:getStats`)

  // handlers for the api
  const { getOptions, status200Errors, normalize } = getStatsFunction[api]

  // get customized options for api endpoint
  const routeOptions = getOptions ? getOptions(options) : options

  debug(`Fetching from ${api}: `, routeOptions)

  const response = await axios({ ...routeOptions, method: 'get' })

  // some api's return status 200 with errors
  if (status200Errors) status200Errors(response)

  // each api has it's own data object structure
  const data = normalize ? normalize(response.data) : response.data
  const { value, error } = await statsSchema.validate(data)
  if (error) throw error
  return value
}
