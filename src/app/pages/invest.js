import React from 'react'
import { Helmet } from 'react-helmet-async'
import { AtomChart } from 'components/chart'
import { useParams } from 'react-router-dom'
import { getTicker } from 'conf/tickers'
import { Container as ChartContainer } from 'components/chart'
import { chartAtom } from 'recoilStore/atoms'
import { useRecoilValue } from 'recoil'

const atomKey = 'invest'
const key = `AtomChart_${atomKey}`

const Invest = () => {
  let { symbol = 'BTCT' } = useParams()
  symbol = symbol.toUpperCase()
  const company = getTicker(symbol)

  const { data } = useRecoilValue(chartAtom(key))

  return (
    <div id='invest'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Stock Investment</title>
      </Helmet>
      <ChartContainer direction={'column'}>
        <AtomChart
          key={symbol}
          symbol={symbol}
          interval={'1day'}
          draggable={false}
          resizeable={false}
          atomKey={atomKey}
        />
      </ChartContainer>
    </div>
  )
}

export default Invest
