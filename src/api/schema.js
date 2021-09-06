import Joi from 'joi'

const candle = Joi.object({
  timestamp: Joi.date(),
  volume:    Joi.number(),
  open:      Joi.number(),
  close:     Joi.number(),
  high:      Joi.number(),
  low:       Joi.number(),
})

export const candles = Joi.array().items(candle)
