import React from 'react'
import moment from 'moment'
import { isNumber } from 'lodash'

import {
  Line,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const tickStyle = { fill: 'white', fontSize: '1.3rem' }
const tooltipContentStyle = { backgroundColor: 'black', border: 'none' }

const yFormatter = (val) => isNumber(val) && isFinite(val) ? `$${val.toFixed(2)}` : val
const xFormatter = (val) => moment(val).format('h:mmA')

// const tooltipFormatter = (val, _name, _props) => isNumber(val) && isFinite(val) ? val.toFixed(2) : val
const tooltipFormatter = (val, _name, _props) => moment(val).format('h:mmA')

const LineChart = ({ data, width, height }) => (
  <ReLineChart
    width={width}
    height={height}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <XAxis
      tick={tickStyle}
      tickFormatter={xFormatter}
      dataKey='timestamp'
      interval='preserveStartEnd'
      angle={-45}
    />
    <YAxis
      tick={tickStyle}
      tickFormatter={yFormatter}
      domain={['dataMin', 'dataMax']}
    />
    <Tooltip
      tooltipFormatter={tooltipFormatter}
      filterNull
      active
      contentStyle={tooltipContentStyle}
    />
    <Line type='monotone' dataKey='close' stroke='#03d9ff' dot={false} />
    <Line type='monotone' dataKey='open' stroke='#ff03c4' dot={false} />
  </ReLineChart>
)

export default LineChart
