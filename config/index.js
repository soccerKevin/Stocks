import dotenv from 'dotenv'

import merge from 'deepmerge'

dotenv.config()

const env = process.env.NODE_ENV

import defaultConfig from './default'
import devConfig from './development'
import prodConfig from './production'

const envConfig = env === 'production' ? prodConfig : devConfig

const config = merge(defaultConfig, envConfig)

export default config
