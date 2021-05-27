import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import axios from 'axios'
import classNames from 'classnames'

import { Box, Skeleton } from '@material-ui/core'
import { ResponsiveContainer } from 'recharts'
import { Rnd } from 'react-rnd'

import LineChart from './lineChart'

import { TICKERS_HASH } from 'conf/tickers'
import { TickerSelect, IntervalSelect } from 'components/selects'

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

const Chart = ({ symbol: symb, interval: int, resizeable, draggable }) => {
  const [symbol, setSymbol] = useState(symb)
  const [interval, setInterval] = useState(int)
  const { data, isLoading, isSuccess } = useQuery([symbol, { symbol, interval }], getData, { retry })

  return (
    <Rnd
      className={classNames(['chart', { ['immobile']: !draggable }])}
      default={{ x: 10, y: 10, width: 730, height: 250 }}
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
        </Box>
      </Box>
      <Box>
        <ResponsiveContainer width='100%' height='80%'>
          {
            isLoading && isSuccess
              ? <Skeleton />
              : <LineChart data={data} />
          }
        </ResponsiveContainer>
      </Box>
    </Rnd>
  )
}

Chart.propTypes = {
  symbol:     PropTypes.string,
  interval:   PropTypes.string,
  resizeable: PropTypes.bool,
  draggable:  PropTypes.bool,
}

Chart.defaultProps = {
  symbol:     'GROW',
  interval:   '1min',
  resizeable: true,
  draggable:  true,
}

export default Chart
