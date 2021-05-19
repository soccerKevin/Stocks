import React from 'react'
import {
  Line,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const LineChart = ({ data, width, height }) => (
  <ReLineChart
    width={width}
    height={height}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <XAxis tick={{ fill: 'white' }} dataKey='xName' />
    <YAxis tick={{ fill: 'white' }} domain={['dataMin', 'dataMax']} />
    <CartesianGrid strokeDasharray='3 3' />
    <Tooltip />
    <Line type='monotone' dataKey='close' stroke='#82ca9d' dot={false} />
    <Line type='monotone' dataKey='open' stroke='#ff0000' dot={false} />
  </ReLineChart>
)

export default LineChart
