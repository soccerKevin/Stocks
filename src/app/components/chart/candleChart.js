import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isNumber } from 'lodash'

import {
  Bar,
  BarChart,
  Cell,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const tickStyle = { fill: 'white', fontSize: '1.3rem' }
const tooltipContentStyle = { backgroundColor: 'black', border: 'none' }

const yFormatter = (val) => isNumber(val) && isFinite(val) ? `$${val.toFixed(2)}` : val
const xFormatter = (val) => moment(new Date(val)).format('h:mmA')

const tooltipFormatter = (val, _name, _props) => moment(val).format('h:mmA')

const Candlestick = (props) => {
  console.log('stick: ', props)
  const {
    fill,
    x,
    y,
    width,
    height,
    low,
    high,
    openClose: [open, close],
  } = props
  const isGrowing = open < close
  const color = isGrowing ? 'green' : 'red'
  const ratio = Math.abs(height / (open - close))

  return (
    <g stroke={color} fill={ isGrowing ? 'green' : null } strokeWidth="2">
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* bottom line */}
      {
        isGrowing
          ? (
            <path
              d={`
                M ${x + width / 2}, ${y + height}
                v ${(open - low) * ratio}
              `}
            />
          )
          : (
            <path
              d={`
                M ${x + width / 2}, ${y}
                v ${(close - low) * ratio}
              `}
            />
          )
      }
      {/* top line */}
      {
        isGrowing
          ?  (
            <path
              d={`
                  M ${x + width / 2}, ${y}
                  v ${(close - high) * ratio}
                `}
            />
          )
          : (
            <path
              d={`
                  M ${x + width / 2}, ${y + height}
                  v ${(open - high) * ratio}
                `}
            />
          )
      }
    </g>
  )
}

const CandleChart = ({ data, width, height }) => {
  const normalizedData = data.map((d) => ({ ...d, width: .5, openClose: [d.open, d.close], height: d.high - d.low }))
  console.log('width, height: ', width, height)
  return (
    <BarChart
      width={width}
      height={height}
      data={normalizedData}
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
      <Bar
        dataKey="openClose"
        fill="#8884d8"
        shape={<Candlestick />}
        // label={{ position: 'top' }}
      >
        {
          normalizedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={'red'} />
          ))
        }
      </Bar>
      <Tooltip
        tooltipFormatter={tooltipFormatter}
        filterNull
        active
        contentStyle={tooltipContentStyle}
      />
      <Line type='monotone' dataKey='close' stroke='#03d9ff' dot={false} />
      <Line type='monotone' dataKey='open' stroke='#ff03c4' dot={false} />
    </BarChart>
  )
}

export default CandleChart
