import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import axios from 'axios'

import { Box, Skeleton } from '@material-ui/core'
import { ResponsiveContainer } from 'recharts'
import { Rnd } from 'react-rnd'

import LineChart from './lineChart'

import { COMPANY_HASH } from 'conf/companies'
import { CompanySelect, IntervalSelect } from 'components/selects'

import './style/chart.less'

const getData = async ({ queryKey: [_key, { symbol, ...options }] }) => (
  axios.get(`/api/stock/${symbol}`, { params: options })
  .then((res) => res.data)
)

const Chart = ({ symbol: symb, interval: int }) => {
  const [symbol, setSymbol] = useState(symb)
  const [interval, setInterval] = useState(int)
  const { data, isLoading } = useQuery([symbol, { symbol, interval }], getData)

  return (
    <Rnd className='chart' default={{ x: 10, y: 10, width: 730, height: 250 }}>
      <Box className='header'>
        <h2 className='companyName'>{COMPANY_HASH[symbol]}</h2>
        <Box className='controls'>
          <CompanySelect
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
            isLoading
              ? <Skeleton />
              : <LineChart data={data} />
          }
        </ResponsiveContainer>
      </Box>
    </Rnd>
  )
}

Chart.propTypes = {
  symbol:   PropTypes.string,
  interval: PropTypes.string,
}

Chart.defaultProps = {
  symbol: 'GROW',
  interval: '5min',
}

export default Chart
