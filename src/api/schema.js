import Joi from 'joi'

const candle = Joi.object({
  timestamp: Joi.date(),
  volume:    Joi.number().allow(null),
  open:      Joi.number().allow(null),
  close:     Joi.number().allow(null),
  high:      Joi.number().allow(null),
  low:       Joi.number().allow(null),
})

export const candles = Joi.array().items(candle)
