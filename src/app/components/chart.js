import React from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { 
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const normalize = (data) => data.map((point) => {
  point.xName = moment(point.timeStamp).format('DD-HH:mm')
  return point
})

const getData = async () => {
  return fetch('/api/stock/GROW')
  .then((res) => res.json())
  .then((data) => normalize(data))
}

const Chart = () => {
  const query = useQuery('data', getData)
  console.log('data: ', query.data)

  return (
    <LineChart 
      width={730} 
      height={250} 
      data={query.data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <XAxis dataKey='xName' />
      <YAxis domain={['dataMin', 'dataMax']} />
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      <Line type='monotone' dataKey='close' stroke='#82ca9d' dot={false} />
      <Line type='monotone' dataKey='open' stroke='#ff0000' dot={false} />
    </LineChart>
  )
}

export default Chart