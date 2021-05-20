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

const yFormatter = (val) => isNumber(val) && isFinite(val) ? val.toFixed(2) : val
const xFormatter = (val) => moment(val).format('DD-HH:mm')

const tooltipFormatter = (val, _name, _props) => isNumber(val) && isFinite(val) ? val.toFixed(2) : val

const LineChart = ({ data, width, height, xLabel }) => (
  <ReLineChart
    width={width}
    height={height}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <XAxis
      tick={tickStyle}
      tickFormatter={xFormatter}
      dataKey='timestamp'
      label={xLabel}
      // ticks={[ data[0].timestamp, data[-1].timestamp ]}
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
      wrapperStyle={{ backgroundColor: 'black' }}
    />
    <Line type='monotone' dataKey='close' stroke='#03d9ff' dot={false} />
    <Line type='monotone' dataKey='open' stroke='#ff03c4' dot={false} />
  </ReLineChart>
)

export default LineChart
