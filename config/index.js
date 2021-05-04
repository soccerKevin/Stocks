require('dotenv').config()

const merge = require('deepmerge')

const env = process.env.NODE_ENV

const defaultConfig = require('./default.js')
const envConfig = require(`./${env}.js`)

const config = merge(defaultConfig, envConfig)

module.exports = config