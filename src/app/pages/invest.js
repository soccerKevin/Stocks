import React from 'react'
import { Helmet } from 'react-helmet-async'
import { InvestChart } from 'components/chart'
import { useParams } from 'react-router-dom'
import { getTicker } from 'conf/tickers'
import { Container as ChartContainer } from 'components/chart'

const Invest = () => {
  let { symbol = 'BTCT' } = useParams()
  symbol = symbol.toUpperCase()
  const company = getTicker(symbol)

  return (
    <div id='invest'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Stock Investment</title>
      </Helmet>
      <ChartContainer direction={'column'}>
        <InvestChart
          key={symbol}
          symbol={symbol}
          interval={'1day'}
          draggable={false}
          resizeable={false}
        />
      </ChartContainer>
    </div>
  )
}

export default Invest
