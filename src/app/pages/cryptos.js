import React from 'react'
import { Chart } from 'components/chart'
import { Container as ChartContainer } from 'components/chart'

import { CRYPTO_SYMBOLS } from 'conf/cryptos'

const useableCryptos = ['BTCT', 'ETHT']
const cryptos = CRYPTO_SYMBOLS.filter((crypto) => useableCryptos.includes(crypto))

const Cryptos = () => (
  <div id='cryptos'>
    <ChartContainer direction={'column'}>
      {
        cryptos.map((symbol) => (
          <Chart
            key={symbol}
            symbol={symbol}
            draggable={false}
            resizeable={false}
          />
        ))
      }
    </ChartContainer>
  </div>
)

export default Cryptos
