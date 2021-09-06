import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { chartAtom } from 'recoilStore/atoms'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import axios from 'axios'
import classNames from 'classnames'
import { uniqueId } from 'lodash'

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

const AtomChart = ({ symbol: symb, interval: int, range: ra, resizeable, draggable, atomKey }) => {
  const key = `AtomChart_${atomKey}`
  const [state, setState] = useRecoilState(chartAtom(key))
  const { symbol, interval, range } = state;
  const { data, isLoading, isError } = useQuery([symbol, { symbol, interval, range }], getData, { retry })

  console.log('symbol: ', symbol)
  console.log('interval: ', interval)
  console.log('range: ', range)
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
            onChange={(e, value) => setState({ ...state, symbol: value.symbol })}
            defaultValue={symb}
          />
          <IntervalSelect
            onChange={(e, value) => setState({ ...state, interval: value })}
            defaultValue={int}
          />
          <RangeSelect
            onChange={(e, value) => setState({ ...state, range: value })}
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

AtomChart.propTypes = {
  symbol:     PropTypes.string,
  interval:   PropTypes.string,
  range:      PropTypes.string,
  resizeable: PropTypes.bool,
  draggable:  PropTypes.bool,
  atomKey:    PropTypes.string,
}

AtomChart.defaultProps = {
  symbol:     'GROW',
  interval:   '1day',
  range:      '1year',
  resizeable: true,
  draggable:  true,
}

export default AtomChart
