import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Chart } from 'components/chart'
import { useParams } from 'react-router-dom'
import { getTicker } from 'conf/tickers'

const Invest = () => {
  let { symbol = 'BTCT' } = useParams()
  symbol = symbol.toUpperCase()
  const company = getTicker(symbol)
  console.log('company: ', company)

  return (
    <div id='invest'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Stock Investment</title>
      </Helmet>
      <h1>{company.name}</h1>
      <Chart
        key={symbol}
        symbol={symbol}
        interval={'1day'}
        draggable={false}
        resizeable={false}
      />
    </div>
  )
}

export default Invest
