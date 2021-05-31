import React from 'react'
import { Chart } from 'components/chart'
import { Container as ChartContainer } from 'components/chart'
import { useParams } from 'react-router-dom'

const Spread = () => {
  let { symbol = 'BTCT' } = useParams()
  symbol = symbol.toUpperCase()

  return (
    <div id='spread'>
      <ChartContainer direction={'column'}>
        <Chart
          key={`${symbol}1min`}
          symbol={symbol}
          interval={'1min'}
          draggable={false}
          resizeable={false}
        />
        <Chart
          key={`${symbol}5min`}
          symbol={symbol}
          interval={'5min'}
          draggable={false}
          resizeable={false}
        />
        <Chart
          key={`${symbol}15min`}
          symbol={symbol}
          interval={'15min'}
          draggable={false}
          resizeable={false}
        />
      </ChartContainer>
    </div>
  )
}

export default Spread
