import React from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import LineChart from './lineChart'

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

  return (
    <LineChart data={query.data} />
  )
}

export default Chart