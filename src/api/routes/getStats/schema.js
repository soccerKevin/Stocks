import Joi from 'joi'

export const stats = Joi.object({
  currentPrice:  Joi.number(),
  marketCap:     Joi.number(),
  marketChange:  Joi.number(),
  percentChange: Joi.number(),
  pegRatio:      Joi.number(),
  beta:          Joi.number(),
})
