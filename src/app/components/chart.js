import React from 'react'
import { useQuery } from 'react-query'
import { 
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const getData = async () => {
  return fetch('/api/stock/GROW')
  .then((res) => res.json())
  .then((data) => {
    console.log('data: ', data)
    return data
  })
}

const Chart = () => {
  const query = useQuery('data', getData)

  return (
    <AreaChart 
      width={730} 
      height={250} 
      data={query.data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id='colorVolume' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8}/>
          <stop offset='95%' stopColor='#82ca9d' stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey='timeStamp' />
      <YAxis />
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      <Area type='monotone' dataKey='volume' stroke='#82ca9d' fillOpacity={1} fill='url(#colorVolume)' />
    </AreaChart>
  )
}

export default Chart