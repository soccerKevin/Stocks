import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import axios from 'axios'
import classNames from 'classnames'

import { Box, Skeleton } from '@material-ui/core'
import { ResponsiveContainer } from 'recharts'
import { Rnd } from 'react-rnd'

import CandleChart from './candleChart'

import { TICKERS_HASH } from 'conf/tickers'
import { TickerSelect, IntervalSelect, RangeSelect } from 'components/selects'

import './style/chart.less'

const getData = async ({ queryKey: [_key, { symbol, ...options }] }) => (
  axios.get(`/api/stock/${symbol}/candle`, { params: options })
  .then((res) => res.data)
)

const retry = (failureCount, error) => {
  if (error.message.includes('500')) return false
  if (failureCount >= 2) return false
  return true
}

const InvestChart = ({ symbol: symb, interval: int, range: ra, resizeable, draggable }) => {
  const [symbol, setSymbol] = useState(symb)
  const [interval, setInterval] = useState(int)
  const [range, setRange] = useState(ra)
  const { data, isLoading, isError } = useQuery([symbol, { symbol, interval, range }], getData, { retry })

  return (
    <Rnd
      className={classNames(['chart', { ['immobile']: !draggable }])}
      default={{ x: 10, y: 10 }}
      enableResizing={resizeable}
      disableDragging={!draggable}
    >
      <Box className='header'>
        <h2 className='tickerName'>{TICKERS_HASH[symbol].name}</h2>
        <Box className='controls'>
          <TickerSelect
            onChange={(e, value) => setSymbol(value.symbol)}
            defaultValue={symb}
          />
          <IntervalSelect
            onChange={(e, value) => setInterval(value)}
            defaultValue={int}
          />
          <RangeSelect
            onChange={(e, value) => setRange(value)}
            defaultValue={ra}
          />
        </Box>
      </Box>
      <Box>
        <ResponsiveContainer width='100%' height='80%'>
          {
            isLoading || isError
              ? <Skeleton />
              : <CandleChart data={data} />
          }
        </ResponsiveContainer>
      </Box>
    </Rnd>
  )
}

InvestChart.propTypes = {
  symbol:     PropTypes.string,
  interval:   PropTypes.string,
  range:      PropTypes.string,
  resizeable: PropTypes.bool,
  draggable:  PropTypes.bool,
}

InvestChart.defaultProps = {
  symbol:     'GROW',
  interval:   '1day',
  range:      '1year',
  resizeable: true,
  draggable:  true,
}

export default InvestChart
