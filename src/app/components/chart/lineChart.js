import React from 'react'
import moment from 'moment'

import {
  Line,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const yFormatter = (val) => isNaN(val) || !isFinite(val) ? val : val.toFixed(2)
const xFormatter = (val) => moment(val).format('DD-HH:mm')

const LineChart = ({ data, width, height }) => (
  <ReLineChart
    width={width}
    height={height}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <XAxis
      tick={{ fill: 'white' }}
      tickFormatter={xFormatter}
      dataKey='timestamp'
    />
    <YAxis
      tick={{ fill: 'white' }}
      tickFormatter={yFormatter}
      domain={['dataMin', 'dataMax']}
    />
    <CartesianGrid strokeDasharray='3 3' />
    <Tooltip />
    <Line type='monotone' dataKey='close' stroke='#82ca9d' dot={false} />
    <Line type='monotone' dataKey='open' stroke='#ff0000' dot={false} />
  </ReLineChart>
)

export default LineChart
